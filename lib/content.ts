export const SITE = {
  name: "Tinker Pathways",
  tagline: "Preparing students for the age of agentic software engineering",
  description:
    "We build the tools, curriculum, and community to help young people discover the craft of agentic software engineering — one experiment at a time.",
  url: "https://tinkerpathways.com",
  email: "hello@tinkerpathways.com",
  charityNumber: "Registered Charity No. 1218899",
  registeredAddress: "",
} as const;

export const NAV_ITEMS = [
  { label: "Projects", href: "/projects" },
  { label: "Team", href: "/team" },
  { label: "Our Story", href: "/our-story" },
  { label: "Testimonies", href: "/testimonies" },
  { label: "Waitlist", href: "/waitlist" },
] as const;

export const STATS = [
  { value: 19800000, suffix: "+", label: "Students reached" },
  { value: 12, suffix: "+", label: "Active learners" },
  { value: 2, suffix: "+", label: "Partner schools" },
  { value: 4.9, suffix: "★", label: "Average rating", decimals: 1 },
] as const;

export const MISSION = {
  heading: "We believe the next generation should build the future, not just consume it.",
  body: [
    "Agentic software engineering — the craft of designing systems that reason, plan, and act — is reshaping every industry. But most young people never get the chance to tinker with it. We're changing that.",
    "Tinker Pathways creates open, hands-on learning experiences that turn curious students into capable engineers. Our tools lower the barrier to entry; our community keeps them going.",
  ],
} as const;

export const STEPS = [
  {
    number: "01",
    title: "Explore",
    description:
      "Students discover core ideas through interactive notebooks and guided experiments. No prior experience needed — just curiosity.",
  },
  {
    number: "02",
    title: "Build",
    description:
      "Using our open toolchain, students design and build their own agentic systems — from simple chatbots to multi-agent workflows.",
  },
  {
    number: "03",
    title: "Launch",
    description:
      "Projects go live. Students share their work, earn badges, and connect with mentors who help them take the next step.",
  },
] as const;

export const ABOUT_CARDS = [
  {
    title: "Projects",
    description:
      "Explore the open-source tools, curricula, and experiments we're building to make agentic engineering education accessible to every young person.",
    action: "View projects",
    href: "/projects",
  },
  {
    title: "Trustees & Team",
    description:
      "Built for students, by students — our team of young leaders runs the charity day-to-day, from product to finance to governance. Meet the team.",
    action: "Meet the team",
    href: "/team",
  },
  {
    title: "Our Story",
    description:
      "Founded in 2026 by three teenagers with no experience and a plan. Tinker Pathways was born from a simple belief: the next generation should build the future, not just consume it.",
    action: "Read our story",
    href: "/our-story",
  },
] as const;

export const CTA = {
  heading: "Help us shape the next generation of engineers",
  body: "Whether you're an educator, engineer, or philanthropist, there's a place for you on this pathway. Every contribution goes directly toward building free tools and resources for students.",
  donateLabel: "Make a donation",
  volunteerLabel: "Volunteer your time",
} as const;

export const FOOTER_COLUMNS = [
  {
    heading: "Explore",
    links: [
      { label: "Projects", href: "/projects" },
      { label: "Trustees & Team", href: "/team" },
      { label: "Our Story", href: "/our-story" },
      { label: "Testimonies", href: "/testimonies" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Donate", href: "/donate" },
      { label: "Join the waitlist", href: "/waitlist" },
      { label: "Contact Us", href: `mailto:${SITE.email}` },
    ],
  },
] as const;

export const WAITLIST_COPY = {
  kicker: "Coming soon",
  title: "Waitlist",
  heading: "Be first in line",
  lede: "We're working on an AI block-coding education tool. Join the waitlist and we'll be in touch when there's news to share.",
  nameLabel: "Your name",
  namePlaceholder: "Ada Lovelace",
  emailLabel: "Email address",
  emailPlaceholder: "you@example.com",
  roleLabel: "I am a…",
  roles: ["Student", "Teacher", "Parent", "Other"],
  submitLabel: "Join the waitlist",
  successHeading: "You're on the list",
  successBody:
    "Thanks for your interest. We'll be in touch at the email you gave us when there's news to share.",
  contactFallback: "Prefer email? Get in touch directly and we'll add you manually.",
} as const;

export const TESTIMONIES_COPY = {
  kicker: "Testimonies",
  title: "Testimonies",
  heading: "What our community says",
  lede: "What students, teachers, and parents say about learning with Tinker Pathways.",
  disclaimer:
    "The quotes below are illustrative placeholders — real testimonies coming soon.",
  placeholderBadge: "Illustrative placeholder",
  quotes: [
    {
      role: "Student",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      role: "Teacher",
      body: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat, etc.",
    },
    {
      role: "Parent",
      body: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur, etc.",
    },
    {
      role: "Student",
      body: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum, etc.",
    },
    {
      role: "Teacher",
      body: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, etc.",
    },
    {
      role: "Parent",
      body: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur, etc.",
    },
  ],
} as const;
