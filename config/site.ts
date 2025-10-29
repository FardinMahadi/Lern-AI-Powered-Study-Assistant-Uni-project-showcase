// Site configuration and metadata

export const siteConfig = {
  name: "Lern",
  description:
    "Your personal learning companion. Master new skills, track your progress, and achieve your goals with our intelligent learning platform.",
  url: "https://lern.app",
  ogImage: "/images/og-image.jpg",
  links: {
    github: "https://github.com/yourusername/lern",
    twitter: "https://twitter.com/lernapp",
  },
  creator: {
    name: "Your Name",
    url: "https://yourwebsite.com",
  },
};

export const navConfig = {
  mainNav: [
    {
      title: "Features",
      href: "/features",
    },
    {
      title: "Pricing",
      href: "/pricing",
    },
    {
      title: "About",
      href: "/about",
    },
  ],
  dashboardNav: [
    {
      title: "Overview",
      href: "/overview",
      icon: "dashboard",
    },
    {
      title: "Notes",
      href: "/notes",
      icon: "notes",
    },
    {
      title: "Chat",
      href: "/chat",
      icon: "chat",
    },
    {
      title: "Settings",
      href: "/settings",
      icon: "settings",
    },
  ],
};
