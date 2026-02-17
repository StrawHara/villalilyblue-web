import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_PORT === "465",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

interface ContactEmailData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  arrival: string;
  departure: string;
  guests: string;
  message: string;
  locale?: string;
}

const confirmationTemplates = {
  fr: {
    subject: "Votre demande pour Villa Lily Blue - Confirmation",
    greeting: (name: string) => `Merci pour votre demande, ${name} !`,
    received: "Nous avons bien reçu votre demande de réservation pour Villa Lily Blue.",
    dates: "Dates demandées :",
    guests: "Nombre de voyageurs :",
    response: "Nous vous répondrons dans les plus brefs délais (généralement sous 24h).",
    closing: "À très bientôt à Saint Martin !",
    team: "L'équipe Villa Lily Blue",
  },
  en: {
    subject: "Your request for Villa Lily Blue - Confirmation",
    greeting: (name: string) => `Thank you for your request, ${name}!`,
    received: "We have received your booking request for Villa Lily Blue.",
    dates: "Requested dates:",
    guests: "Number of guests:",
    response: "We will get back to you as soon as possible (usually within 24 hours).",
    closing: "See you soon in Saint Martin!",
    team: "The Villa Lily Blue Team",
  },
  es: {
    subject: "Su solicitud para Villa Lily Blue - Confirmación",
    greeting: (name: string) => `¡Gracias por su solicitud, ${name}!`,
    received: "Hemos recibido su solicitud de reserva para Villa Lily Blue.",
    dates: "Fechas solicitadas:",
    guests: "Número de huéspedes:",
    response: "Le responderemos lo antes posible (generalmente en 24 horas).",
    closing: "¡Nos vemos pronto en Saint Martin!",
    team: "El equipo de Villa Lily Blue",
  },
};

export async function sendContactEmail(data: ContactEmailData) {
  const { firstName, lastName, email, phone, arrival, departure, guests, message, locale } = data;

  // Email to owner (always in French)
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.SMTP_TO,
    replyTo: email,
    subject: `Nouvelle demande de réservation - ${firstName} ${lastName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1e3a5f; padding: 20px 30px; border-radius: 8px 8px 0 0;">
          <h2 style="color: #ffffff; margin: 0;">Nouvelle demande de réservation</h2>
        </div>

        <div style="padding: 20px 30px; border: 1px solid #eee; border-top: none; border-radius: 0 0 8px 8px;">
          <table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 140px;">Nom</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${firstName} ${lastName}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${email}" style="color: #3AA6B9;">${email}</a></td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Téléphone</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="tel:${phone}" style="color: #3AA6B9;">${phone}</a></td>
            </tr>
            ` : ""}
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Dates</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${arrival} → ${departure}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Voyageurs</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${guests} personne(s)</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold;">Langue du site</td>
              <td style="padding: 10px;">${locale === "es" ? "Espagnol" : locale === "en" ? "Anglais" : "Français"}</td>
            </tr>
          </table>

          <h3 style="color: #1e3a5f; margin-top: 20px;">Message</h3>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px;">
            ${message.replace(/\n/g, "<br>")}
          </div>

          <p style="color: #999; font-size: 12px; margin-top: 30px;">
            Envoyé depuis le formulaire de contact de villalilyblue.com
          </p>
        </div>
      </div>
    `,
  });

  // Confirmation email to guest (in their language)
  const lang = locale && locale in confirmationTemplates
    ? (locale as keyof typeof confirmationTemplates)
    : "fr";
  const tpl = confirmationTemplates[lang];

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: tpl.subject,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #3AA6B9; padding: 20px 30px; border-radius: 8px 8px 0 0; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px;">Villa Lily Blue</h1>
        </div>

        <div style="padding: 30px; border: 1px solid #eee; border-top: none; border-radius: 0 0 8px 8px;">
          <h2 style="color: #3AA6B9; margin-top: 0;">${tpl.greeting(firstName)}</h2>

          <p style="color: #555; line-height: 1.6;">${tpl.received}</p>

          <div style="background: #e8f4f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>${tpl.dates}</strong> ${arrival} → ${departure}</p>
            <p style="margin: 5px 0;"><strong>${tpl.guests}</strong> ${guests}</p>
          </div>

          <p style="color: #555; line-height: 1.6;">${tpl.response}</p>

          <p style="color: #555; line-height: 1.6;">${tpl.closing}</p>

          <hr style="border: none; border-top: 1px solid #eee; margin: 25px 0;" />

          <p style="margin: 0;">
            <strong>${tpl.team}</strong><br>
            <a href="https://villalilyblue.com" style="color: #3AA6B9;">villalilyblue.com</a>
          </p>
        </div>
      </div>
    `,
  });
}
