import { Metadata } from "next";
import { contactInfo } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch via email or find me on GitHub and LinkedIn.",
};

export default function ContactPage() {
  return (
    <div className="container-editorial">
      <section className="section-major">
        <h1>Contact</h1>

        <div className="max-w-[42.5rem] space-y-6">
          <p>
            The best way to reach me is by email at{" "}
            <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>. I typically
            respond within 24-48 hours.
          </p>

          <p>
            I'm also on GitHub as{" "}
            <a href={contactInfo.github} target="_blank" rel="noopener noreferrer">
              {contactInfo.githubHandle}
            </a>
            {contactInfo.linkedin && (
              <>
                {" "}and LinkedIn at{" "}
                <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer">
                  linkedin.com/in/ismaelm
                </a>
              </>
            )}.
          </p>

          <p>
            My ENS name is <span className="text-mono">{contactInfo.ens}</span>.
          </p>

          <div className="pt-6">
            <a href="/cv.pdf" download>
              Download CV (PDF)
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
