import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contact";
import { sendContactEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the data
    const validatedData = contactSchema.parse(body);

    // Honeypot check
    if (validatedData.honeypot) {
      return NextResponse.json({ success: true }); // Silently ignore spam
    }

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
      });
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      // Log but don't fail - we still want to acknowledge the submission
    }

    console.log("Contact form submission:", {
      name: `${validatedData.firstName} ${validatedData.lastName}`,
      email: validatedData.email,
      dates: `${validatedData.arrival} - ${validatedData.departure}`,
      guests: validatedData.guests,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process request" },
      { status: 400 }
    );
  }
}
