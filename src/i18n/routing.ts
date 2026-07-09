import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "zh"],
  defaultLocale: "en",
  localeDetection: false,
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
