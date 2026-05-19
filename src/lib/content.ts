import type { SiteContent } from "./types";

export const content: SiteContent = {
  identity: {
    name: "Jose Manuel Porras Guerra",
    shortName: "Jose Manuel Porras",
    monogram: "JMP",
    title: "Software Engineer · AI & Automation",
    location: "Havana, Cuba",
    email: "porrasguerrajosemanuel@gmail.com",
    phone: "+53 58783007",
    github: "https://github.com/JManuelPorras",
    linkedin:
      "https://www.linkedin.com/in/jose-manuel-porras-guerra-8a3b843bb",
    cvPath: "/cv/CV-Jose-Manuel-Porras.pdf",
  },

  nav: [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],

  socials: [
    { label: "GitHub", href: "https://github.com/JManuelPorras", kind: "github" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/jose-manuel-porras-guerra-8a3b843bb",
      kind: "linkedin",
    },
    {
      label: "Email",
      href: "mailto:porrasguerrajosemanuel@gmail.com",
      kind: "email",
    },
    { label: "Download CV", href: "/cv/CV-Jose-Manuel-Porras.pdf", kind: "cv" },
  ],

  heroTagline: "Software Engineer · AI & Automation",

  about:
    "Computer Science student and developer focused on AI-driven automation. Hands-on experience shipping local AI/voice tools in Python, a programming-language interpreter in C#, and live web applications. As the sole technical owner at ReAgent Realty Brokerage, I built and deployed the company's full production web platform (Next.js + Supabase) in one month. I work fluently with Claude Code, authoring custom agent skills and multi-agent workflows that sharply multiply my delivery speed.",

  quickFacts: [
    { label: "Based in", value: "Havana, Cuba" },
    { label: "Studying", value: "B.Sc. Computer Science — University of Havana" },
    { label: "Languages", value: "Spanish (native) · English (advanced)" },
    { label: "Status", value: "Open to internships & software roles · Remote" },
  ],

  expertise: [
    {
      title: "AI & Automation",
      points: [
        "Local AI/voice systems in Python: speech-to-text, wake word, VAD, streaming TTS.",
        "Claude Code power user — custom agent skills and multi-agent workflows.",
        "Programming-language interpreter in C# (lexer, parser, semantic analysis).",
        "Automation pipelines that remove manual steps and ship faster.",
      ],
    },
    {
      title: "Production Web Engineering",
      points: [
        "Full-stack Next.js 14 + TypeScript + Supabase, zero to production.",
        "Security hardening: CSP, XSS sanitization, rate limiting, CAPTCHA.",
        "Technical SEO, EN/ES/PT internationalization, accessibility.",
        "Testing & CI/CD: Vitest, Playwright, GitHub Actions, Vercel.",
      ],
    },
  ],

  techStack: [
    {
      label: "Languages",
      items: ["Python", "TypeScript", "JavaScript", "C#", "C", "SQL", "HTML5", "CSS3"],
    },
    {
      label: "Frameworks",
      items: ["Next.js 14", "React", "Tailwind CSS", ".NET", "Node.js", "Pygame"],
    },
    {
      label: "Backend & Data",
      items: ["Supabase", "PostgreSQL", "Upstash Redis"],
    },
    {
      label: "AI & Tooling",
      items: [
        "faster-whisper",
        "Silero VAD",
        "openWakeWord",
        "Edge TTS",
        "Claude Code",
        "Prompt engineering",
      ],
    },
    {
      label: "DevOps",
      items: [
        "Git / GitHub",
        "GitHub Actions",
        "Vercel",
        "Playwright",
        "Vitest",
        "Cloudflare Tunnels",
        "CUDA",
      ],
    },
    {
      label: "Practices",
      items: [
        "Web security",
        "Technical SEO",
        "i18n",
        "Automated testing",
        "OOP",
        "Language design",
      ],
    },
  ],

  spokenLanguages: ["Spanish — Native", "English — Advanced (technical fluency)"],

  experience: [
    {
      role: "Founding Software Engineer (Sole Developer)",
      org: "ReAgent Realty Brokerage",
      location: "Remote",
      period: "Apr 2026 — Present",
      summary:
        "Sole technical owner of a Miami-focused luxury real-estate startup — the first Bitcoin/blockchain-based brokerage in Miami Beach.",
      bullets: [
        "Built and shipped the company's production web platform single-handedly — Next.js 14 + TypeScript + Supabase, deployed on Vercel — from zero to production in one month.",
        "Engineered a secure Supabase backend (Postgres, Row-Level Security, role-segregated clients) and hardened the app via a self-run security audit: nonce-based CSP, XSS sanitization, IP rate-limiting + CAPTCHA on the leads API.",
        "Implemented technical SEO (schema.org JSON-LD, hreflang, sitemap) and EN/ES/PT internationalization, plus validated lead-capture forms (Zod + react-hook-form).",
        "Set up the full quality pipeline: Vitest unit tests, Playwright E2E with local Supabase, GitHub Actions CI/CD, and Vercel observability.",
        "Multiplied delivery speed by mastering Claude Code: authored 14 custom skills and a multi-agent (review/test/research) workflow that automate releases and QA.",
      ],
    },
    {
      role: "Freelance Web Developer",
      org: "Real Estate Landing Pages",
      location: "Remote",
      period: "2025 — Present",
      summary:
        "Independent web work for real-estate lead generation.",
      bullets: [
        "Built and operate an automated HTML redirect system serving time-windowed landing-page previews for property listings via Cloudflare tunnels.",
        "Designed the automation so lead-facing previews update without manual intervention and degrade gracefully outside viewing hours.",
      ],
    },
  ],

  projects: [
    {
      slug: "hey-jarvis",
      title: "hey-jarvis",
      tag: "AI · Voice",
      description:
        "Windows voice assistant on Claude Code: wake word, GPU speech-to-text, intent routing, streaming TTS, and a verbal-confirmation safety hook for dangerous commands.",
      tech: ["Python", "faster-whisper", "Claude Code"],
      repoUrl: "https://github.com/JManuelPorras/hey-jarvis",
      featured: true,
    },
    {
      slug: "faster-whisper-dictation",
      title: "faster-whisper-dictation",
      tag: "AI · Tooling",
      description:
        "100% local push-to-talk dictation for Windows. faster-whisper large-v3 on NVIDIA CUDA, ~1s latency, no cloud. Published MIT with bilingual docs.",
      tech: ["Python", "CUDA", "Whisper"],
      repoUrl: "https://github.com/JManuelPorras/faster-whisper-dictation",
      featured: true,
    },
    {
      slug: "wall-e-interpreter",
      title: "Wall-E Interpreter",
      tag: "Language Design",
      description:
        "A programming-language interpreter built from scratch in C#: lexer, parser, semantic analysis, AST and a WPF GUI that draws pixel art.",
      tech: ["C#", ".NET", "WPF"],
      repoUrl: "https://github.com/JManuelPorras/wall-e-interpreter",
      featured: true,
    },
    {
      slug: "azucararte",
      title: "Azucararte",
      tag: "Web · Live",
      description:
        "Multipage bakery website with JSON-driven content and accessibility, deployed to production on Vercel.",
      tech: ["HTML5", "Tailwind", "JavaScript"],
      repoUrl: "https://github.com/JManuelPorras/Sitio-web-Azucararte",
      liveUrl: "https://sitio-web-azucararte.vercel.app",
      image: "/projects/azucararte.png",
      featured: true,
    },
    {
      slug: "alien-invasion",
      title: "Alien Invasion",
      tag: "Game · Python",
      description:
        "Arcade shooter (Space Invaders style) in Python with Pygame — levels, scoring, high-score tracking, sound.",
      tech: ["Python", "Pygame", "OOP"],
      repoUrl: "https://github.com/JManuelPorras/Alien-Invasion",
      featured: false,
    },
    {
      slug: "spanish-citizenship-game",
      title: "Spanish Citizenship Game",
      tag: "Game · C#",
      description:
        "Turn-based maze board game for up to 4 players — an object-oriented design project in C# / .NET 8.",
      tech: ["C#", ".NET 8", "OOP"],
      repoUrl: "https://github.com/JManuelPorras/spanish-citizenship-game",
      featured: false,
    },
    {
      slug: "leads-redirect",
      title: "leads-redirect",
      tag: "Automation",
      description:
        "Automated HTML redirect system serving time-windowed landing-page previews via Cloudflare tunnels.",
      tech: ["HTML", "Cloudflare", "Automation"],
      repoUrl: "https://github.com/JManuelPorras/leads-redirect",
      featured: false,
    },
  ],

  education: {
    degree: "B.Sc. in Computer Science",
    institution: "University of Havana",
    status: "2nd year — in progress",
    coursework: [
      "Programming-language interpreter in C# (lexer, parser, semantics)",
      "Object-oriented programming",
      "Operating systems (MINIX / C)",
      "Algorithms & data structures",
    ],
  },
};
