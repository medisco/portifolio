import { Metadata } from "next";
import { contactInfo } from "@/lib/data";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with me about opportunities, collaborations, or anything else.",
};

export default function ContactPage() {
  return (
    <div className="container-section py-12 md:py-16 lg:py-20">
      {/* Header */}
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold text-[var(--color-text-primary)]">
          Get in Touch
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)]">
          I'd love to hear from you. Whether you have a question, opportunity,
          or just want to say hello, feel free to reach out.
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-2">
        {/* Contact Form */}
        <div>
          <ContactForm />
        </div>

        {/* Contact Info */}
        <div>
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-[var(--color-text-primary)]">
              Direct Contact
            </h2>
            <p className="mb-4 text-[var(--color-text-secondary)]">
              Prefer to reach out directly? You can email me or find me on these
              platforms:
            </p>

            {/* Contact Links */}
            <div className="space-y-3">
              {/* Email */}
              <div>
                <p className="text-sm font-medium text-[var(--color-text-primary)]">
                  Email
                </p>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-[var(--color-brand-600)] hover:text-[var(--color-brand-700)] no-underline"
                >
                  {contactInfo.email}
                </a>
              </div>

              {/* GitHub */}
              <div>
                <p className="text-sm font-medium text-[var(--color-text-primary)]">
                  GitHub
                </p>
                <a
                  href={contactInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-brand-600)] hover:text-[var(--color-brand-700)] no-underline"
                >
                  {contactInfo.github}
                </a>
              </div>

              {/* LinkedIn */}
              <div>
                <p className="text-sm font-medium text-[var(--color-text-primary)]">
                  LinkedIn
                </p>
                <a
                  href={contactInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-brand-600)] hover:text-[var(--color-brand-700)] no-underline"
                >
                  {contactInfo.linkedin}
                </a>
              </div>

              {/* Twitter */}
              {contactInfo.twitter && (
                <div>
                  <p className="text-sm font-medium text-[var(--color-text-primary)]">
                    X (Twitter)
                  </p>
                  <a
                    href={contactInfo.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-brand-600)] hover:text-[var(--color-brand-700)] no-underline"
                  >
                    {contactInfo.twitter}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Response Time */}
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-6">
            <h3 className="mb-2 font-semibold text-[var(--color-text-primary)]">
              Response Time
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)]">
              I typically respond to emails within 24-48 hours. For urgent
              matters, feel free to reach out on LinkedIn or GitHub.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
