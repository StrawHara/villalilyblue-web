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
}

export async function sendContactEmail(data: ContactEmailData) {
  const { firstName, lastName, email, phone, arrival, departure, guests, message } = data;

  // Email to owner
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.SMTP_TO,
    replyTo: email,
    subject: `Nouvelle demande de réservation - ${firstName} ${lastName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #3AA6B9;">Nouvelle demande de réservation</h2>

        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Nom</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${firstName} ${lastName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          ${phone ? `
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Téléphone</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="tel:${phone}">${phone}</a></td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Dates</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${arrival} → ${departure}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Voyageurs</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${guests} personne(s)</td>
          </tr>
        </table>

        <h3 style="color: #16213e;">Message</h3>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 8px;">
          ${message.replace(/\n/g, '<br>')}
        </div>

        <p style="color: #888; font-size: 12px; margin-top: 30px;">
          Ce message a été envoyé depuis le formulaire de contact de villalilyblue.com
        </p>
      </div>
    `,
  });

  // Confirmation email to guest
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: `Votre demande pour Villa Lily Blue - Confirmation`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #3AA6B9;">Merci pour votre demande, ${firstName} !</h2>

        <p>Nous avons bien reçu votre demande de réservation pour Villa Lily Blue.</p>

        <div style="background: #e8f4f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Dates demandées :</strong> ${arrival} → ${departure}</p>
          <p><strong>Nombre de voyageurs :</strong> ${guests}</p>
        </div>

        <p>Nous vous répondrons dans les plus brefs délais (généralement sous 24h).</p>

        <p>À très bientôt à Saint Martin !</p>

        <p style="margin-top: 30px;">
          <strong>L'équipe Villa Lily Blue</strong><br>
          <a href="https://villalilyblue.com">villalilyblue.com</a>
        </p>
      </div>
    `,
  });
}
