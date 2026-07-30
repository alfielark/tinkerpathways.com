export const SITE = {
  name: "Tinker Pathways",
  tagline: "Preparing students for the age of agentic software engineering",
  description:
    "We build the tools, curriculum, and community to help young people discover the craft of agentic software engineering — one experiment at a time.",
  url: "https://tinkerpathways.com",
  charityNumber: "Registered Charity No. 1218899",
  registeredAddress: "",
} as const;

export const NAV_ITEMS = [
  { label: "Our Mission", href: "#mission" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "About Us", href: "#about" },
  { label: "Get Involved", href: "#get-involved" },
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
    title: "Governance",
    description:
      "Built for students, by students — our team of young leaders runs the charity day-to-day, from product to finance to governance. Meet the team.",
    action: "Meet the team",
    href: "/governance",
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

export const FOOTER_LINKS = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Contact Us", href: "#" },
  { label: "Safeguarding", href: "#" },
] as const;

export const SOCIAL_LINKS = [
  { label: "GitHub", href: "#" },
  { label: "X (Twitter)", href: "#" },
  { label: "LinkedIn", href: "#" },
] as const;
