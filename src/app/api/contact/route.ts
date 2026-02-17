import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contact";
import { sendContactEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || "unknown";

  const { allowed, remaining } = rateLimit(ip);

  if (!allowed) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": "900", "X-RateLimit-Remaining": "0" },
      }
    );
  }

  try {
    const body = await request.json();

    // Validate the data
    const validatedData = contactSchema.parse(body);

    // Honeypot check
    if (validatedData.honeypot) {
      return NextResponse.json({ success: true }); // Silently ignore spam
    }

    // Detect locale from referer or accept-language
    const referer = request.headers.get("referer") || "";
    let locale = "fr";
    if (referer.includes("/en/") || referer.includes("/en")) locale = "en";
    else if (referer.includes("/es/") || referer.includes("/es")) locale = "es";

    // Send emails via SMTP
    try {
      await sendContactEmail({
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        phone: validatedData.phone,
        arrival: validatedData.arrival,
        departure: validatedData.departure,
        guests: validatedData.guests,
        message: validatedData.message,
        locale,
      });
    } catch (emailError) {
      console.error("Email sending error:", emailError);
    }

    console.log("Contact form submission:", {
      name: `${validatedData.firstName} ${validatedData.lastName}`,
      email: validatedData.email,
      dates: `${validatedData.arrival} - ${validatedData.departure}`,
      guests: validatedData.guests,
      locale,
    });

    return NextResponse.json(
      { success: true },
      { headers: { "X-RateLimit-Remaining": String(remaining) } }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process request" },
      { status: 400 }
    );
  }
}
