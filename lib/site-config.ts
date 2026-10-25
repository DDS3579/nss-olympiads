const rawUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://nss-olympiads.vercel.app";

export const siteConfig = {
  name: "NSS Olympiad Hub",
  url: rawUrl.replace(/\/+$/, ""), // NEVER a trailing slash (B-02)
  description:
    "Free, level-wise Olympiad preparation for Nepal — verified study material, past papers and roadmaps for 7 Olympiads. Built by NSS Clubs for students in Grades 8–12.",
  social: {
    instagram: "https://www.instagram.com/nss_.club/",
  },
  contact: {
    emailAddress: "nssclub2078@gmail.com",
  },
  legal: {
    privacy: "/privacy",
    terms: "/terms",
    faq: "/faq",
  },
} as const;

export const mailto = (subject?: string, body?: string) => {
  const q = [
    subject && `subject=${encodeURIComponent(subject)}`,
    body && `body=${encodeURIComponent(body)}`,
  ]
    .filter(Boolean)
    .join("&");
  return `mailto:${siteConfig.contact.emailAddress}${q ? `?${q}` : ""}`;
};