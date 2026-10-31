export const siteConfig = {
  /** Wordmark shown in the header and footer. Monograph uses text, never a logo image. */
  name: "tancz.my",
  tagline: "Mateusz Duda's blog & portfolio",
  title: "tanczmy - Make the internet great again",
  description:
    "A personal website with a blog and portfolio, aspiring to be a cozy place on the web.",
  siteUrl: "https://tancz.my",
  authorName: "Mateusz Duda",
  email: "mateusz.duda2@gmail.com",
  language: "en",
  dateLocale: "en-US",
  locale: "en_US",
  socialImage: "/og-image.png",
  /** Shown in the home sidebar "About" card. */
  about: `I'm a frontend developer with 3+ years of professional experience. This website is created to be a place to dump all the stuff I'm passionate about. I'm always eager to collaborate on an interesting project, so if you have one hit me up!`,
  // Shown in the 'recommended' card on homepage
  recommended: `Things worth checking out`,
  /**
   * Both forms below ship enabled with an empty `action`, which makes them fully
   * interactive demos that submit nowhere: a small script confirms the submit
   * and clears the fields. Paste your provider's endpoint into `action` to send
   * real submissions, or set `enabled: false` to disable the controls outright.
   * 
   * TODO: Add newsletter based on RSS feed & follow.it
   */
  newsletter: {
    enabled: false,
    action: "",
    method: "post",
    emailFieldName: "email",
    title: "Get new posts by email",
    description: "One email when something new goes up. No spam, unsubscribe anytime.",
  },
  // Contact form is handled by Netlify
  contact: {
    enabled: true,
    method: "POST",
  },
  socials: [
    { label: "GitHub", href: "https://github.com/matiduda/" },
    { label: "Instagram", href: "https://instagram.com/tanczmy/" },
    { label: "YouTube", href: "https://www.youtube.com/@tnczm" },
    { label: "SoundCloud", href: "https://soundcloud.com/tanczmy" },
  ],
};

/** Header navigation. Add or remove entries freely; the header renders them in order. */
export const navigation = [
  { label: "Blog", href: "/posts/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
];

/** Secondary navigation rendered in the footer. */
export const footerNavigation = [
  { label: "Privacy", href: "/privacy/" },
  { label: "AI policy", href: "/ai/" },
  { label: "RSS", href: "/rss.xml" },
];

/** Custom "reccomendations" section on the main page. */
export const recommendations = [
  {
    label: "Rowerem z Sercem",
    description: "Non-profit livestream event",
    href: "https://roweremzsercem.pl/",
    image: "rzs",
    class: ""
  },
  {
    label: "NaszEauto",
    description: "Electric vehicle subsidy program",
    href: "https://naszeauto.gov.pl/",
    image: "naszeauto",
    class: "scale-150"
  },
] as const;

export type Recommendation = (typeof recommendations)[number];