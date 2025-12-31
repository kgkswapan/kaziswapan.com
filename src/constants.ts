import type { Props } from "astro";
import IconMail from "@/assets/icons/IconMail.svg";
import { SITE } from "@/config";

interface Social {
  name: string;
  href: string;
  linkTitle: string;
  icon?: (_props: Props) => Element;
  iconClass?: string;
}

export const SOCIALS: Social[] = [
  {
    name: "GitHub",
    href: "https://github.com/kgkswapan",
    linkTitle: `${SITE.title} on GitHub`,
    iconClass: "fa-brands fa-github",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/kgkswapan/",
    linkTitle: `${SITE.title} on LinkedIn`,
    iconClass: "fa-brands fa-linkedin",
  },
  {
    name: "Google Scholar",
    href: "https://scholar.google.com/citations?user=Zbj4vPUAAAAJ&hl=en",
    linkTitle: `${SITE.title} on Google Scholar`,
    iconClass: "fa-brands fa-google-scholar",
  },
  {
    name: "ResearchGate",
    href: "https://www.researchgate.net/profile/Kazi-Gulam-Kadar",
    linkTitle: `${SITE.title} on ResearchGate`,
    iconClass: "fa-brands fa-researchgate",
  },
  {
    name: "ORCID",
    href: "https://orcid.org/0009-0003-0893-5660",
    linkTitle: `${SITE.title} on ORCID`,
    iconClass: "fa-brands fa-orcid",
  },
  {
    name: "Contact",
    href: "/contact",
    linkTitle: `Open the contact page for ${SITE.title}`,
    iconClass: "fa-solid fa-envelope",
  },
] as const;

export const SHARE_LINKS: Social[] = [
  {
    name: "Mail",
    href: "mailto:?subject=See%20this%20post&body=",
    linkTitle: `Share this post via email`,
    icon: IconMail,
  },
] as const;
