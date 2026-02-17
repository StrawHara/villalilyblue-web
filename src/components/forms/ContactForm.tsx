"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Textarea } from "@/components/ui";
import { contactSchema, type ContactFormData } from "@/lib/validations/contact";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      honeypot: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    // Honeypot check
    if (data.honeypot) {
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        trackEvent("submit", "contact_form", "success");
        setStatus("success");
        reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        trackEvent("submit", "contact_form", "error");
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Honeypot - hidden from users */}
      <input
        type="text"
        {...register("honeypot")}
        className="absolute left-[-9999px]"
        tabIndex={-1}
        autoComplete="off"
      />

      {/* Name fields */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          id="firstName"
          label={t("firstName")}
          placeholder={t("firstName")}
          error={errors.firstName?.message}
          {...register("firstName")}
        />
        <Input
          id="lastName"
          label={t("lastName")}
          placeholder={t("lastName")}
          error={errors.lastName?.message}
          {...register("lastName")}
        />
      </div>

      {/* Email & Phone */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          id="email"
          type="email"
          label={t("email")}
          placeholder="email@example.com"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          id="phone"
          type="tel"
          label={t("phone")}
          placeholder="+33 6 00 00 00 00"
          error={errors.phone?.message}
          {...register("phone")}
        />
      </div>

      {/* Dates */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          id="arrival"
          type="date"
          label={t("arrival")}
          error={errors.arrival?.message}
          {...register("arrival")}
        />
        <Input
          id="departure"
          type="date"
          label={t("departure")}
          error={errors.departure?.message}
          {...register("departure")}
        />
      </div>

      {/* Guests */}
      <div>
        <label htmlFor="guests" className="mb-2 block text-sm font-medium text-gray-700">
          {t("guests")}
        </label>
        <select
          id="guests"
          {...register("guests")}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-[var(--foreground)] transition-all duration-200 focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
        >
          <option value="">--</option>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        {errors.guests && (
          <p className="mt-1 text-sm text-[var(--error)]">{errors.guests.message}</p>
        )}
      </div>

      {/* Message */}
      <Textarea
        id="message"
        label={t("message")}
        placeholder={t("message")}
        error={errors.message?.message}
        {...register("message")}
      />

      {/* Privacy */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="privacy"
          {...register("privacy")}
          className="mt-1 h-4 w-4 rounded border-gray-300 text-[var(--primary)] focus:ring-[var(--primary)]"
        />
        <label htmlFor="privacy" className="text-sm text-gray-600">
          {t("privacy")}
        </label>
      </div>
      {errors.privacy && (
        <p className="text-sm text-[var(--error)]">{errors.privacy.message}</p>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full"
        isLoading={status === "loading"}
        disabled={status === "loading"}
      >
        {status === "loading" ? (
          t("sending")
        ) : (
          <>
            <Send className="h-5 w-5" />
            {t("submit")}
          </>
        )}
      </Button>

      {/* Status Messages */}
      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 rounded-lg bg-[var(--success)]/10 p-4 text-[var(--success)]"
          >
            <CheckCircle className="h-5 w-5" />
            {t("success")}
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 rounded-lg bg-[var(--error)]/10 p-4 text-[var(--error)]"
          >
            <AlertCircle className="h-5 w-5" />
            {t("error")}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
