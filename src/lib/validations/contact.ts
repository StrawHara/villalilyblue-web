import { z } from "zod";

export const contactSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  phone: z.string().optional(),
  arrival: z.string().min(1, "La date d'arrivée est requise"),
  departure: z.string().min(1, "La date de départ est requise"),
  guests: z.string().min(1, "Le nombre de voyageurs est requis"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
  privacy: z.boolean().refine((val) => val === true, {
    message: "Vous devez accepter la politique de confidentialité",
  }),
  honeypot: z.string().max(0), // Anti-spam honeypot
});

export type ContactFormData = z.infer<typeof contactSchema>;
