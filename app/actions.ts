"use server";

export interface ContactFormInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormResult {
  success: boolean;
  errors?: Record<string, string>;
}

export async function submitContactForm(
  data: ContactFormInput
): Promise<ContactFormResult> {
  // Server-side validation
  const errors: Record<string, string> = {};

  if (!data.name.trim()) {
    errors.name = "Name is required";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!isValidEmail(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!data.subject.trim()) {
    errors.subject = "Subject is required";
  } else if (data.subject.length > 200) {
    errors.subject = "Subject must be less than 200 characters";
  }

  if (!data.message.trim()) {
    errors.message = "Message is required";
  } else if (data.message.length < 10) {
    errors.message = "Message must be at least 10 characters";
  } else if (data.message.length > 5000) {
    errors.message = "Message must be less than 5000 characters";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  // Mock submission: just log it
  console.log("📧 Contact form submission:", {
    timestamp: new Date().toISOString(),
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message,
  });

  // Simulate a small delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return { success: true };
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
