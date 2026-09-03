export const images = {
  hero: "/assets/hero_human_team.jpg",
  heroBoardroom: "/assets/hero_executive_boardroom.jpg",
  // Human-centric images throughout the site
  team: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1400&q=85",
  dashboard: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=85",
  workshop: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=85",
  portrait: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=700&q=85",
  executiveAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=85",
  architecture: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=85",
  northstar: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=85",
  fjord: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1600&q=85",
  atlas: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1600&q=85",
  growthEngine: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=85",
  flagshipProduct: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=85",
  brandWorld: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=85",
};

export const navItems = [
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Selected Work", to: "/work" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Methodology", to: "/approach" },
  { label: "Insights", to: "/insights" },
  { label: "Careers", to: "/careers" },
];

export const clientLogos = [
  "NORTHSTAR LIVING",
  "FJORD DYNAMICS",
  "ATLAS ENTERPRISE",
  "VERVE GLOBAL",
  "MERIDIAN LABS",
  "LUMINA WEALTH",
  "KINETIC APPAREL",
  "CYPHER AI",
];

export const services = [
  {
    number: "01",
    title: "Commercial Growth Engines",
    text: "High-precision performance systems, full-funnel retention architecture, and quantitative attribution that convert global market attention into compounding enterprise value.",
    tags: ["Performance Media", "Algorithmic SEO", "Attribution Models"],
    deliverables: ["Commercial Roadmaps", "Campaign Architecture", "Growth Instrumentation"],
    icon: "chart",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=85",
  },
  {
    number: "02",
    title: "Flagship Digital Products",
    text: "Bespoke web applications, customer portals, and unified CRM ecosystems engineered with micro-millimeter craft, extreme speed, and conversion precision.",
    tags: ["Enterprise Platforms", "Custom Web Apps", "Automation Layers"],
    deliverables: ["Product Architecture", "Design System Engineering", "Full-Stack Deployment"],
    icon: "code",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=85",
  },
  {
    number: "03",
    title: "Brand Worlds & Positioning",
    text: "Radical brand positioning and cohesive visual identities that establish category leadership, command premium pricing, and resonate across international cultures.",
    tags: ["Strategic Positioning", "Identity Systems", "Launch Direction"],
    deliverables: ["Brand Foundations", "Design Guidelines", "Global Asset Library"],
    icon: "palette",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=85",
  },
];

export interface ProjectItem {
  slug: string;
  type: string;
  title: string;
  client: string;
  result: string;
  secondaryMetric: string;
  category: string;
  domain: string;
  image: string;
  color: string;
  summary: string;
  challenge: string;
  decision: string;
  deliverables: string[];
  markets: string;
  timeline: string;
  outcome: string;
  learning: string;
  technologies?: string[];
  testimonialId?: string;
  featured?: boolean;
}

export interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  metricValue: string;
  metricLabel: string;
  badgeColor: string;
  rating: number;
  location: string;
}

export const caseStudies: ProjectItem[] = [
  {
    slug: "northstar-commerce",
    type: "Enterprise Flagship",
    title: "Accelerating a Category Leader to $40M ARR",
    client: "Northstar Living",
    result: "+240% qualified pipeline",
    secondaryMetric: "$18.4M added annualized revenue",
    category: "Commercial Engine · Digital Platform",
    domain: "Luxury & Commerce",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
    color: "emerald",
    summary: "Rebuilding the digital commerce engine and predictive customer acquisition infrastructure for an international lifestyle brand.",
    challenge: "Overcome escalating customer acquisition costs and fragmented attribution across seven international regions without discounting brand equity.",
    decision: "Consolidate the brand and customer journey into one high-velocity, modular digital flagship backed by event-level multi-touch attribution.",
    deliverables: ["Performance Architecture", "Flagship Web Application", "Customer Lifetime Journey", "Analytics Warehouse"],
    markets: "North America · Europe · India",
    timeline: "14 Weeks to Pilot Launch",
    outcome: "+240% increase in high-intent customer pipeline and a 42% reduction in blended CPA within 90 days of deployment.",
    learning: "When technical infrastructure is frictionless, creative bravery delivers 3x stronger commercial leverage.",
    technologies: ["Next.js", "TypeScript", "Multi-Touch Attribution", "Edge CDN", "Custom CMS"],
    testimonialId: "northstar",
    featured: true,
  },
  {
    slug: "fjord-mobility",
    type: "Global Launch Platform",
    title: "Deploying an Electric Mobility Platform Across 11 Nations",
    client: "Fjord Dynamics",
    result: "11 global markets unified",
    secondaryMetric: "99.8% customer satisfaction score",
    category: "Brand Systems · Product Engineering",
    domain: "CleanTech & Mobility",
    image: "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1600&q=85",
    color: "stone",
    summary: "Crafting a unified digital launch platform that flexed seamlessly from boardroom enterprise fleets to urban riders.",
    challenge: "Deliver a coherent brand promise that respected distinct regulatory frameworks and consumer habits from Stockholm to Tokyo.",
    decision: "Create an adaptive design token ecosystem allowing local market marketing teams to deploy customized landing engines in under 4 hours.",
    deliverables: ["Global Design Tokens", "Fleet Portal Interface", "Multi-Language Web Engine", "Onboarding Flow"],
    markets: "EU · UK · Singapore · Japan",
    timeline: "20 Weeks to Global Rollout",
    outcome: "Simultaneous 11-market rollout with zero platform downtime and over 85,000 corporate fleet reservations in month one.",
    learning: "True global consistency is achieved by empowering local intelligence with rock-solid architectural constraints.",
    technologies: ["Design Tokens", "Micro-Frontends", "Multi-Tenant Edge", "GraphQL API"],
    testimonialId: "fjord",
    featured: true,
  },
  {
    slug: "atlas-crm",
    type: "Enterprise Systems Transformation",
    title: "Eliminating Friction in Enterprise B2B Sales Cycles",
    client: "Atlas Enterprise",
    result: "38% faster deal velocity",
    secondaryMetric: "+64 Net Promoter Score",
    category: "CRM Architecture · Workflow Engineering",
    domain: "Enterprise SaaS",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=85",
    color: "slate",
    summary: "Transforming disconnected sales tools into a single, intuitive operating system for a 200-person revenue organization.",
    challenge: "Sales executives spent 40% of their day navigating clunky legacy software rather than closing eight-figure enterprise contracts.",
    decision: "Architect a calm, keyboard-first deal management terminal that unified pipeline signals, contract automation, and predictive customer health.",
    deliverables: ["Custom CRM Interface", "Automated Contract Pipeline", "Executive Analytics Suite", "Team Enablement"],
    markets: "Global / Distributed Executive Org",
    timeline: "16 Weeks End-to-End",
    outcome: "38% faster proposal-to-close velocity and a 100% adoption rate across all regional sales heads within 30 days.",
    learning: "The highest ROI software is the software your highest performers actually enjoy opening every single morning.",
    technologies: ["Keyboard-First UI", "WebSockets", "Automated Deal Flow", "PostgreSQL", "Tailored Tokens"],
    testimonialId: "atlas",
    featured: true,
  },
];

export const stats = [
  { value: "$140M+", label: "Client revenue unlocked across portfolio" },
  { value: "2.4×", label: "Average pipeline velocity improvement" },
  { value: "11", label: "Global markets actively operating" },
  { value: "99.2%", label: "Executive partner renewal & retention" },
];

export const testimonials: TestimonialItem[] = [
  {
    id: "northstar",
    author: "Marcus Vance",
    role: "Chief Commercial Officer",
    company: "Northstar Living",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=85",
    quote:
      "Storm Veins transformed how our leadership, product, and growth teams collaborate. They did not just design a flagship website; they engineered an undeniable commercial engine that scaled our international pipeline by 240% in four months.",
    metricValue: "+240%",
    metricLabel: "Pipeline Velocity",
    badgeColor: "emerald",
    rating: 5,
    location: "London / New York",
  },
  {
    id: "fjord",
    author: "Elena Rostova",
    role: "VP of Digital Engineering",
    company: "Fjord Dynamics",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=85",
    quote:
      "The engineering precision and human empathy of their team is extraordinary. Deploying an electric mobility platform across 11 sovereign nations with zero downtime required exceptional architectural discipline and round-the-clock collaboration.",
    metricValue: "11 Nations",
    metricLabel: "Zero Downtime Rollout",
    badgeColor: "blue",
    rating: 5,
    location: "Stockholm / Singapore",
  },
  {
    id: "meridian",
    author: "Devin Chen",
    role: "Managing Partner",
    company: "Meridian Labs",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=85",
    quote:
      "Unlike traditional agencies that pass you off to junior account managers, Storm Veins' senior principals sit directly in our executive briefings every single week. That strategic continuity and personal accountability is why we have retained them for 3 consecutive years.",
    metricValue: "60% Faster",
    metricLabel: "Clinical Intake",
    badgeColor: "champagne",
    rating: 5,
    location: "San Francisco / Mumbai",
  },
  {
    id: "lumina",
    author: "Sophia Al-Mansoor",
    role: "Founder & Chief Executive",
    company: "Lumina Wealth",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=85",
    quote:
      "In sovereign wealth, trust is paramount. Storm Veins crafted an interface with such quiet authority and bespoke micro-interactions that our high-net-worth partner acquisition accelerated immediately. They treat our reputation with the same gravity we do.",
    metricValue: "+42%",
    metricLabel: "AUM Onboarding",
    badgeColor: "emerald",
    rating: 5,
    location: "Dubai / Geneva",
  },
  {
    id: "atlas",
    author: "Kavita Krishnamurthy",
    role: "Head of Global Revenue Operations",
    company: "Atlas Enterprise",
    avatar: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=300&q=85",
    quote:
      "Our 200-person enterprise sales organization actually enjoys opening the platform every single morning. The keyboard-first terminal cut our proposal-to-close cycle by 38% and eliminated 4 legacy software tools in one stroke.",
    metricValue: "38%",
    metricLabel: "Faster Deal Velocity",
    badgeColor: "purple",
    rating: 5,
    location: "Mumbai / Chicago",
  },
  {
    id: "verve",
    author: "Julian Thorne",
    role: "Managing Director",
    company: "Verve Global",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=85",
    quote:
      "Storm Veins turned our high-stakes commercial real estate pipeline into an institutional powerhouse. Over $120M in cross-border property transactions cleared in year one without a single friction point.",
    metricValue: "$120M+",
    metricLabel: "Transactions Processed",
    badgeColor: "stone",
    rating: 5,
    location: "London / Zurich",
  },
  {
    id: "cypher",
    author: "Dr. Aris Thorne",
    role: "Chief Information Security Officer",
    company: "Cypher AI",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=85",
    quote:
      "In cybersecurity, clarity is leverage. Storm Veins repositioned our autonomous defense category and built an acquisition engine that tripled our enterprise ARR while slashing CAC in half.",
    metricValue: "+310%",
    metricLabel: "ARR Growth YoY",
    badgeColor: "emerald",
    rating: 5,
    location: "Austin / Singapore",
  },
];

export const industries = [
  {
    id: "saas",
    name: "B2B Enterprise SaaS & Cloud",
    shortName: "Enterprise SaaS",
    lead: "We engineer high-conversion buyer journeys, product-led expansion loops, and calm executive interfaces that turn complex technical value into undeniable ARR velocity.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=85",
    stats: [
      { value: "3.4×", label: "Demo-to-Closed-Won", desc: "through frictionless buyer onboarding and interactive product previews." },
      { value: "99.98%", label: "Platform SLA Uptime", desc: "enterprise-grade cloud architecture built for zero downtime." },
      { value: "100%", label: "SOC2 & ISO 27001", desc: "audited security and enterprise procurement compliance standards." },
    ],
    capabilities: [
      "Interactive Product Sandboxes",
      "Executive Pitch Portals",
      "Multi-Tenant Design Systems",
      "Algorithmic Inbound Attribution",
    ],
  },
  {
    id: "fintech",
    name: "Fintech, Banking & Sovereign Wealth",
    shortName: "Fintech & Banking",
    lead: "Build radical trust and compliance resilience with secure, ultra-low latency digital portals, predictive investment interfaces, and institutional-grade onboarding.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=85",
    stats: [
      { value: "Sub-20ms", label: "Transaction Latency", desc: "distributed edge routing optimized across 11 sovereign hubs." },
      { value: "$140M+", label: "Capital Flow Unlocked", desc: "accreted through automated high-net-worth lead qualification." },
      { value: "0", label: "Critical Vulnerabilities", desc: "continuous pen-testing and PCI DSS Level 1 audit standards." },
    ],
    capabilities: [
      "Institutional Portal Architecture",
      "Real-Time Telemetry Dashboards",
      "Biometric & KYC Onboarding",
      "Automated Wealth Reporting",
    ],
  },
  {
    id: "luxury-real-estate",
    name: "Prime Living, Hospitality & Real Estate",
    shortName: "Prime Real Estate",
    lead: "Command sovereign valuation with cinematic digital flagships, 3D architectural pavilions, and high-touch private client reservation engines.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=85",
    stats: [
      { value: "45%", label: "Faster Buyer Inquiries", desc: "through immersive digital residences and virtual walkthroughs." },
      { value: "3.2×", label: "Average Deal Size Uplift", desc: "attracting ultra-high-net-worth global investors across 11 markets." },
      { value: "99.4%", label: "Client Experience Score", desc: "bespoke white-glove concierge integration on every interaction." },
    ],
    capabilities: [
      "Interactive 3D Masterplan Explorers",
      "Private VIP Reservation Terminals",
      "Multi-Currency Sovereign Portals",
      "Cinematic Motion Storytelling",
    ],
  },
  {
    id: "mobility",
    name: "Autonomous Mobility & CleanTech",
    shortName: "Mobility & CleanTech",
    lead: "Scale international connected fleets and sustainable energy platforms with unified multi-region design tokens, real-time telemetry, and consumer-to-enterprise booking.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=85",
    stats: [
      { value: "11", label: "Sovereign Rollouts", desc: "synchronized deployment across European, Asian, and US markets." },
      { value: "85K+", label: "Month-1 Fleet Bookings", desc: "captured via high-throughput reservation pipelines." },
      { value: "<1.2s", label: "Global Edge Load", desc: "optimized telemetry and lightweight mobile app architecture." },
    ],
    capabilities: [
      "Global Design Token Ecosystems",
      "Fleet Management Telemetry",
      "Cross-Border Localization",
      "Real-Time Route Telematics",
    ],
  },
  {
    id: "retail",
    name: "High-Growth D2C Flagships & Luxury Retail",
    shortName: "Luxury D2C & Retail",
    lead: "Eliminate customer drop-off and maximize customer lifetime value with lightning-fast checkout architectures, predictive personalization, and editorial brand storytelling.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=85",
    stats: [
      { value: "62%", label: "Checkout Speed Uplift", desc: "zero-friction headless commerce engine with instant tokenized pay." },
      { value: "42%", label: "Lower Blended CAC", desc: "driven by organic search authority and high-retention post-purchase flows." },
      { value: "2.8×", label: "Repeat Purchase Rate", desc: "automated VIP loyalty journeys and contextual member tiers." },
    ],
    capabilities: [
      "Sub-Second Headless Commerce",
      "Algorithmic Lifecycle Funnels",
      "Dynamic Editorial Lookbooks",
      "Predictive Inventory Alerts",
    ],
  },
];

export const engagementModels = [
  {
    id: "pod",
    title: "Dedicated Executive Pod",
    subtitle: "Complete Multidisciplinary Squad",
    description:
      "Hand over strategic, design, and engineering objectives to a dedicated multidisciplinary pod of senior operators who embed directly inside your cadence.",
    idealFor: "Scale-ups & enterprises needing high-velocity execution without agency bureaucracy.",
    composition: "1 Partner Strategist · 2 Full-Stack Engineers · 1 Product Designer · 1 Growth Operator",
    cadence: "Weekly executive briefing · Direct Slack/Teams channel · Daily continuous delivery",
    badge: "Most Selected",
    accent: "emerald",
  },
  {
    id: "sprint",
    title: "Flagship Milestone Sprint",
    subtitle: "Fixed-Timeline Platform Delivery",
    description:
      "Fixed-scope, outcome-guaranteed delivery for major platform re-architectures, enterprise redesigns, and global product rollouts with zero scope drift.",
    idealFor: "Organizations launching mission-critical digital flagships with strict deadlines.",
    composition: "1 Principal Systems Architect · 2 Senior UI/UX Engineers · 1 Performance Specialist",
    cadence: "Bi-weekly sprint demos · Transparent milestones · 100% On-time guarantee",
    badge: "Fixed Scope",
    accent: "champagne",
  },
  {
    id: "growth",
    title: "Embedded Growth Architecture",
    subtitle: "Fractional CGO & Performance Squad",
    description:
      "Fractional growth leadership and quantitative performance engineering steering paid media allocation, algorithmic retention, and multi-touch attribution.",
    idealFor: "Category brands looking to scale international pipeline without diluting margin.",
    composition: "1 Growth Principal · 1 Media Performance Lead · 1 Data Analytics Architect",
    cadence: "Bi-monthly attribution audits · Real-time telemetry dashboard · Margin optimization",
    badge: "Compounding ROI",
    accent: "blue",
  },
  {
    id: "advisory",
    title: "Strategic Advisory & Diligence",
    subtitle: "Board-Level Technology & Commercial Audits",
    description:
      "Deep technical, architectural, and commercial due diligence for private equity partners, venture boards, and founders ahead of fundraising or M&A.",
    idealFor: "Boards and executive teams requiring unbiased, expert evaluation before capital deployment.",
    composition: "Managing Partner & Principal Architect",
    cadence: "10-day comprehensive audit dossier · Executive boardroom presentation",
    badge: "Executive Diligence",
    accent: "purple",
  },
];

export const insights = [
  {
    category: "Executive Strategy",
    title: "Why Multi-Million Dollar Brands Lose Margin in the Handoff Between Brand and Performance",
    readTime: "6 min read",
    accent: "emerald",
    date: "August 2026",
    author: "Marcus Vance",
    authorRole: "Managing Partner, Commercial Architecture",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=85",
    coverImage: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=85",
  },
  {
    category: "Product Architecture",
    title: "Designing for Quiet Authority: Why Enterprise Portals Are Rejecting SaaS Clutter",
    readTime: "8 min read",
    accent: "stone",
    date: "July 2026",
    author: "Elena Rostova",
    authorRole: "Principal Systems Architect",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=85",
    coverImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=85",
  },
  {
    category: "Commercial Operations",
    title: "The Zero-Waste Growth Model: Replacing Vanity Metrics with Direct Enterprise Attribution",
    readTime: "5 min read",
    accent: "slate",
    date: "June 2026",
    author: "Devin Chen",
    authorRole: "Director of Performance Engineering",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=85",
    coverImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=85",
  },
];

export const portfolioProjects: ProjectItem[] = [
  {
    slug: "fintech-core",
    type: "Digital Flagship",
    title: "Next-Gen Wealth Management Interface",
    client: "Lumina Wealth",
    result: "+42% AUM onboarding velocity",
    secondaryMetric: "Zero downtime multi-sovereign rollout",
    category: "Institutional Fintech",
    domain: "Fintech",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1600&q=85",
    color: "emerald",
    summary: "A complete rebuild of the client-facing portal and advisor dashboard for a leading European wealth management firm managing over $12B in AUM.",
    challenge: "Lumina Wealth's legacy portal was heavily fragmented, causing high drop-off rates during the critical initial onboarding phase. The friction in navigating complex financial products alienated younger, high-net-worth digital natives.",
    decision: "We architected a unified, micro-frontend portal with direct integrations to core banking APIs. By leveraging a centralized design token system, we eliminated visual clutter and streamlined the entire portfolio management workflow into a serene, predictive interface.",
    deliverables: ["Platform Architecture", "UX/UI Design System", "API Orchestration", "Predictive Analytics Engine"],
    markets: "EU & UK",
    timeline: "24 Weeks",
    outcome: "Within 60 days of launch, Lumina saw a 42% increase in completed onboarding flows and a 3x increase in daily active portal engagement from their existing client base.",
    learning: "Seamless, consumer-grade UX can completely offset the inherent friction of complex institutional financial workflows.",
    technologies: ["React 19", "Micro-Frontends", "WebSockets", "Zero-Trust Auth", "Fintech Design System"],
    testimonialId: "lumina",
    featured: true,
  },
  {
    slug: "healthcare-systems",
    type: "Enterprise CRM & Intake",
    title: "Unified Patient Journey Architecture",
    client: "Meridian Labs",
    result: "60% faster clinical intake",
    secondaryMetric: "HIPAA Compliant Infrastructure",
    category: "HealthTech & Bio",
    domain: "Healthcare",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1600&q=85",
    color: "slate",
    summary: "Consolidating 14 disjointed regional clinics into a single, secure, cloud-native patient management ecosystem.",
    challenge: "Inconsistent patient records and fragmented communication across 14 acquired clinics resulted in delayed care delivery and massive operational overhead for administrative staff.",
    decision: "We engineered a centralized, HIPAA-compliant CRM architecture. By treating patient intake as a high-velocity digital flow, we removed redundant data entry and automated secure cross-clinic record transfers.",
    deliverables: ["Clinical CRM Architecture", "Data Migration Strategy", "Staff Workflow Systems", "Automated Intake Flows"],
    markets: "North America",
    timeline: "32 Weeks",
    outcome: "Meridian achieved a 60% reduction in patient wait times and reclaimed over 4,000 hours of administrative overhead per month, directly improving care quality.",
    learning: "Strict compliance and extreme operational speed are not mutually exclusive when the data layer is architected correctly.",
    technologies: ["HIPAA-Compliant Cloud", "FHIR Data Standards", "Automated Intake", "Real-Time Telemetry"],
    testimonialId: "meridian",
    featured: false,
  },
  {
    slug: "real-estate-platform",
    type: "Commercial Engine",
    title: "Global Property Investment Portal",
    client: "Verve Global",
    result: "$120M+ institutional transactions",
    secondaryMetric: "3x private investor retention rate",
    category: "Prime Living & PropTech",
    domain: "Real Estate",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
    color: "stone",
    summary: "Architecting a high-performance commercial real estate investment platform for institutional buyers.",
    challenge: "Institutional investors suffered from low visibility and clunky due-diligence workflows when evaluating high-yield international commercial properties.",
    decision: "We built an algorithmic matching engine paired with a hyper-visual property portal. The platform surfaces hidden yield opportunities and digitizes the entire due-diligence document room into a lightning-fast experience.",
    deliverables: ["Investment Portal", "Matching Algorithm", "Due Diligence Workflows", "Investor Dashboard"],
    markets: "Global / Cross-Border",
    timeline: "20 Weeks",
    outcome: "Verve Global processed over $120M in direct transactions in year one, securing a 3x higher retention rate among institutional buyers compared to their legacy system.",
    learning: "In private equity real estate, institutional buyers value speed and clarity of data above all other features.",
    technologies: ["3D Architecture Viewer", "Algorithmic Deal Matching", "Document Room Vault", "Edge Performance"],
    testimonialId: "verve",
    featured: false,
  },
  {
    slug: "saas-growth",
    type: "Growth Engine & Category Creation",
    title: "Autonomous Defense Platform Scaling",
    client: "Cypher AI",
    result: "+310% ARR growth YoY",
    secondaryMetric: "Reduced CAC by 45%",
    category: "Cybersecurity & SaaS",
    domain: "Enterprise SaaS",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=85",
    color: "emerald",
    summary: "End-to-end brand repositioning and growth engine deployment for an AI-driven enterprise cybersecurity firm.",
    challenge: "Despite having superior threat-detection technology, Cypher AI was struggling to differentiate and acquire enterprise logos in a highly saturated, legacy-dominated security market.",
    decision: "We orchestrated a radical category creation strategy focused on 'proactive autonomous defense.' We completely overhauled their brand architecture and deployed a high-velocity, intent-based commercial growth engine.",
    deliverables: ["Brand Architecture", "Growth Engine Deployment", "Sales Enablement Systems", "Performance Media"],
    markets: "North America & APAC",
    timeline: "16 Weeks",
    outcome: "The repositioning allowed Cypher AI to command premium pricing, tripling their ARR (+310%) while simultaneously halving their customer acquisition costs.",
    learning: "In crowded B2B SaaS markets, a sharp, uncompromising point of view is the single best commercial growth multiplier.",
    technologies: ["Intent Attribution Engine", "Enterprise Portal", "Interactive Sandbox", "Algorithmic Inbound"],
    testimonialId: "cypher",
    featured: false,
  },
  {
    slug: "kinetic-commerce",
    type: "Global D2C Engine",
    title: "Unified Global Commerce Architecture",
    client: "Kinetic Apparel",
    result: "+185% mobile checkout conversion",
    secondaryMetric: "Sub-100ms global page transitions",
    category: "Luxury Commerce",
    domain: "Luxury & Commerce",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
    color: "slate",
    summary: "Re-engineering a multi-currency luxury apparel flagship with headless commerce and lightning-fast edge render speeds.",
    challenge: "Slow checkout load times and disjointed multi-currency checkout flows cost millions in cart abandonment across Europe and Asia.",
    decision: "We rebuilt the digital flagship on a headless, edge-rendered architecture with predictive asset pre-caching and 1-click international checkout.",
    deliverables: ["Headless Commerce Architecture", "Global CDN Optimization", "Multi-Currency Checkout", "Design System"],
    markets: "UK · EU · Middle East · US",
    timeline: "18 Weeks",
    outcome: "Mobile checkout conversions spiked +185% in 60 days, with 99.99% uptime during peak holiday sales volume.",
    learning: "In luxury digital commerce, sub-second latency is directly proportional to average order value.",
    technologies: ["Headless Commerce", "Edge SSR", "Predictive Pre-Fetch", "Localized Checkout"],
    testimonialId: "northstar",
    featured: false,
  },
];

export const allProjects: ProjectItem[] = [...caseStudies, ...portfolioProjects];
