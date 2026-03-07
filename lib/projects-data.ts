export interface ProjectGalleryItem {
    image: string;
    title: string;
    description: string;
}

export interface Project {
    slug: string;
    title: string;
    description: string;
    about: string;
    image: string;
    techStack: string[];
    category: string;
    timeline: string;
    role: string;
    liveUrl: string;
    githubUrl: string;
    gallery: ProjectGalleryItem[];
}

export const projectsData: Project[] = [
    {
        slug: "gigi-energy",
        title: "GiGi",
        description: "A bold, high-performance e-commerce platform for a premium energy drink brand — built to convert visitors into loyal customers through immersive product storytelling and a seamless checkout experience.",
        about: "GiGi is more than just an energy drink — it's a lifestyle brand for people who push their limits. The challenge was to build a digital storefront that matched the brand's bold, electric identity while delivering a frictionless shopping experience from first click to checkout.\n\nThe platform features a complete D2C e-commerce flow with cart management, real-time form validation, and a conversion-optimized checkout system. Every interaction is backed by smooth Framer Motion animations and a custom-built UI component library powered by Radix UI, ensuring both accessibility and visual polish.\n\nFrom the neon lime-green accent palette against deep charcoal backgrounds to the product showcase with detailed nutritional breakdowns, every design decision was intentional — engineered to build trust, communicate quality, and drive sales across desktop and mobile.",
        image: "/Images/Project Banners/GiGi.webp",
        techStack: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Radix UI", "Framer Motion", "React Hook Form", "Zod", "React Router", "Recharts", "Embla Carousel"],
        category: "practice",
        timeline: "2025",
        role: "Full-Stack Developer & Designer",
        liveUrl: "https://gigi-famimfarhaz.netlify.app/",
        githubUrl: "#",
        gallery: [
            {
                image: "/Projects/Gigi Website/GiGi - hero section.webp",
                title: "Hero Section",
                description: "A high-energy landing experience with bold typography, vibrant lime-green accents, and an animated product showcase that immediately communicates the brand's identity."
            },
            {
                image: "/Projects/Gigi Website/GiGi - Intro Page.webp",
                title: "Brand Introduction",
                description: "A cinematic scroll-driven introduction that tells the GiGi story — from mission to ingredients — building trust before the visitor even sees a product."
            },
            {
                image: "/Projects/Gigi Website/GiGi - formula.webp",
                title: "Formula & Ingredients",
                description: "A detailed nutritional breakdown section highlighting zero-sugar, natural flavors, and vitamin B enrichment — designed to convert health-conscious buyers."
            },
            {
                image: "/Projects/Gigi Website/GiGi -  product menu.webp",
                title: "Product Menu",
                description: "An interactive product catalog with flavor variants, pricing, and quick-add-to-cart functionality — optimized for fast browsing and impulse purchases."
            },
            {
                image: "/Projects/Gigi Website/GiGi - partnerts page.webp",
                title: "Partners & Creators",
                description: "A dedicated section showcasing gym partnerships, creator collaborations, and corporate wellness programs — establishing social proof and B2B credibility."
            },
            {
                image: "/Projects/Gigi Website/GiGi - checkout page.webp",
                title: "Checkout Experience",
                description: "A streamlined, conversion-focused checkout flow with real-time form validation, order summary, and a clean interface that minimizes cart abandonment."
            },
            {
                image: "/Projects/Gigi Website/GiGi - bottom cta & footer.webp",
                title: "Call-to-Action & Footer",
                description: "A compelling closing section with a bold CTA driving newsletter signups and repeat purchases, paired with a clean footer for easy navigation."
            }
        ]
    },
    {
        slug: "luminis-digital",
        title: "LuminisDigital",
        description: "A refined, animation-driven marketing website for a boutique digital agency — engineered to build credibility with high-value prospects and convert them into discovery call bookings.",
        about: "LuminisDigital needed a website that felt nothing like a template. As a boutique agency targeting SME owners with $2M–$20M in annual revenue, the brand demanded warmth, credibility, and sophistication — not flashy gimmicks.\n\nThe entire experience is powered by GSAP with custom scroll-triggered animations: headlines that land with typographic weight, portfolio cards that tilt on hover with a subtle warmth shift, and stats that count up from 80% with deceleration easing. Lenis provides buttery-smooth inertial scrolling that ties every section together.\n\nThe design philosophy draws inspiration from Basecamp, Stripe (2019–2020), and Ragged Edge Studio — prioritizing strong typography, warm neutrals, and intentional whitespace. Every element is crafted to make the visitor feel they're engaging with a premium, deliberate team.",
        image: "/Images/Project Banners/luminisdigital.webp",
        techStack: ["React 19", "Vite", "GSAP", "Lenis", "CSS Modules", "Playfair Display", "DM Mono"],
        category: "practice",
        timeline: "2025",
        role: "Frontend Developer & Designer",
        liveUrl: "https://luminisdigital-famimfarhaz.netlify.app/",
        githubUrl: "#",
        gallery: [
            {
                image: "/Projects/LuminisDigital/LuminisDigital - Hero section.webp",
                title: "Hero Section",
                description: "A staggered, line-by-line headline animation powered by GSAP — each word lands with weight, establishing authority and premium positioning from the first scroll."
            },
            {
                image: "/Projects/LuminisDigital/LuminisDigital - service section.webp",
                title: "Services Overview",
                description: "A structured breakdown of UI/UX design, web development, and digital marketing capabilities — presented with clean typography and deliberate spacing."
            },
            {
                image: "/Projects/LuminisDigital/LuminisDigital - project's section.webp",
                title: "Portfolio Showcase",
                description: "Project cards with ink-wash hover animations and subtle tilt effects — each project is presented as a case study, not just a screenshot."
            },
            {
                image: "/Projects/LuminisDigital/LuminisDigital - success rate.webp",
                title: "Success Metrics",
                description: "Animated counter stats that count up with ease-out deceleration — building quantifiable trust through real performance numbers."
            },
            {
                image: "/Projects/LuminisDigital/LuminisDigital - testimonials.webp",
                title: "Client Testimonials",
                description: "Social proof section featuring client stories with warm, human-centered design — reinforcing credibility and building emotional connection."
            },
            {
                image: "/Projects/LuminisDigital/LuminisDigital - Bottom & Footer.webp",
                title: "CTA & Footer",
                description: "A focused call-to-action driving discovery call bookings, paired with a minimal footer that keeps navigation clean and purposeful."
            }
        ]
    },
    {
        slug: "skitbit-studio",
        title: "SkitBit",
        description: "An immersive, WebGL-enhanced portfolio for a premium 3D animation studio — designed to showcase creative capabilities through interactive visuals and cinematic storytelling.",
        about: "SkitBit is a 3D animation studio with 7+ years of experience and 500+ projects under their belt. Their website needed to be as visually striking as the work they produce — a digital experience that feels like stepping into a creative studio.\n\nThe site leverages OGL (a lightweight WebGL wrapper) for real-time 3D elements alongside Framer Motion for fluid page transitions. Every section is designed to demonstrate SkitBit's craft: from the kinetic hero with dynamic 3D visuals to the service showcase featuring product visualization, character animation, and fluid simulation examples.\n\nThe dark, cinematic color palette paired with precision typography creates an atmosphere of creative authority. Interactive elements respond to cursor movement and scroll position, making the browsing experience feel alive and intentional — exactly what you'd expect from a studio that pushes creative boundaries.",
        image: "/Images/Project Banners/SkitBit.webp",
        techStack: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion", "OGL (WebGL)", "Radix UI", "Recharts", "React Hook Form", "Zod"],
        category: "practice",
        timeline: "2025",
        role: "Frontend Developer & Designer",
        liveUrl: "https://skitbit-famimfarhaz.netlify.app/",
        githubUrl: "#",
        gallery: [
            {
                image: "/Projects/Skitbit Website/SkitBit - Hero Section.webp",
                title: "Hero Section",
                description: "A cinematic landing experience with dynamic 3D elements powered by OGL — setting the creative tone from the very first frame."
            },
            {
                image: "/Projects/Skitbit Website/SkitBit - hero section1.webp",
                title: "Hero Extended View",
                description: "The full hero scroll reveal with animated statistics — 50+ team members, 500+ projects, and 98% client satisfaction displayed with impact."
            },
            {
                image: "/Projects/Skitbit Website/SkitBit - about us.webp",
                title: "About the Studio",
                description: "A storytelling section introducing SkitBit's team of 3D artists, animators, and creative technologists — built to establish expertise and trust."
            },
            {
                image: "/Projects/Skitbit Website/SkitBit - testimonials.webp",
                title: "Client Testimonials",
                description: "Social proof from satisfied clients, presented with clean typography and subtle animations that reinforce studio credibility."
            },
            {
                image: "/Projects/Skitbit Website/SkitBit - pricing.webp",
                title: "Pricing Plans",
                description: "Transparent service tiers for different project scopes — from product visualization to full character animation packages."
            },
            {
                image: "/Projects/Skitbit Website/SkitBit - FAQ.webp",
                title: "FAQ Section",
                description: "An accordion-based FAQ addressing common client questions about timelines, revisions, and deliverables — reducing friction in the decision-making process."
            },
            {
                image: "/Projects/Skitbit Website/SkitBit - Bottom CTA & footer.webp",
                title: "CTA & Footer",
                description: "A bold closing call-to-action paired with a structured footer — designed to convert interested visitors into booked consultations."
            }
        ]
    },
    {
        slug: "takatrack",
        title: "TakaTrack",
        description: "A full-stack personal finance platform built for Bangladeshi users — featuring expense tracking, budget management, and visual analytics powered by Supabase and Next.js.",
        about: "TakaTrack was born from a simple idea: personal finance management shouldn't be complicated. Built specifically for Bangladeshi users, it removes the complexity of traditional banking tools and replaces it with an intuitive, mobile-first experience for tracking everyday spending.\n\nThe platform is powered by Next.js with server-side rendering for fast initial loads, Supabase for real-time data syncing and bank-level encryption, and Recharts for comprehensive financial visualizations. Users can categorize expenses automatically, set monthly budgets with real-time threshold notifications, and generate detailed spending reports.\n\nBuilt by SoftNova Studio, TakaTrack is 100% free with no hidden fees — a commitment to making financial literacy accessible to everyone. The clean, purposeful interface works seamlessly across web and Android, ensuring users can track their Taka from anywhere.",
        image: "/Images/Project Banners/TakaTrack.webp",
        techStack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Supabase", "Radix UI", "Framer Motion", "Recharts", "React Hook Form", "Zod", "Vercel Analytics"],
        category: "practice",
        timeline: "2025",
        role: "Full-Stack Developer & Designer",
        liveUrl: "https://takatrrack.netlify.app/",
        githubUrl: "#",
        gallery: [
            {
                image: "/Projects/TakaTrack Website/TakaTrack - Hero section.webp",
                title: "Hero Section",
                description: "A clean, confidence-building landing that communicates TakaTrack's mission — take control of your finances with zero complexity."
            },
            {
                image: "/Projects/TakaTrack Website/TakaTrack - Feature's overview.webp",
                title: "Features Overview",
                description: "A structured breakdown of core capabilities — automatic categorization, budget alerts, multi-device sync, and bank-level security."
            },
            {
                image: "/Projects/TakaTrack Website/TakaTrack - features and demo preview.webp",
                title: "Interactive Demo Preview",
                description: "A visual walkthrough of the app experience with animated UI previews — letting users see the product in action before downloading."
            },
            {
                image: "/Projects/TakaTrack Website/TakaTrack - pricng section.webp",
                title: "Pricing Section",
                description: "A transparent pricing display emphasizing TakaTrack's free-forever model — building trust by removing the biggest barrier to adoption."
            },
            {
                image: "/Projects/TakaTrack Website/TakaTrack -  download section.webp",
                title: "Download Section",
                description: "A conversion-optimized download CTA with platform availability badges — driving installs across web and Android."
            },
            {
                image: "/Projects/TakaTrack Website/TakaTrack -  download page.webp",
                title: "Download Page",
                description: "A dedicated download page with device-specific instructions and QR codes — minimizing friction in the onboarding funnel."
            }
        ]
    },
    {
        slug: "wonderkids",
        title: "WonderKids",
        description: "A playful yet polished e-commerce learning platform for children — combining interactive course delivery with a full shopping experience, powered by GSAP animations and a custom cart system.",
        about: "WonderKids sits at the intersection of education and e-commerce. It's a platform where parents discover interactive courses for their children and shop for learning materials — all within a single, beautifully animated experience that feels both professional and delightfully playful.\n\nThe interface is driven by a dual animation engine: GSAP handles complex scroll-triggered sequences and page transitions, while Framer Motion powers component-level interactions. A custom cursor follows the user across the site, adding a layer of interactivity that makes browsing feel like play. Lenis provides the smooth scrolling foundation that ties everything together.\n\nThe full e-commerce flow — from product browsing to cart management to checkout and order confirmation — is built with a custom React Context-based state system. The design language uses a purple and gold color palette with premium typography (Fraunces, Cabinet Grotesk, DM Sans), creating a warm, trustworthy aesthetic that appeals to parents while remaining engaging for kids.",
        image: "/Images/Project Banners/WonderKids.webp",
        techStack: ["React 19", "Vite", "Tailwind CSS", "GSAP", "Framer Motion", "Lenis", "React Router", "React Context"],
        category: "practice",
        timeline: "2025",
        role: "Full-Stack Developer & Designer",
        liveUrl: "https://wonderkids-famimfarhaz.netlify.app/",
        githubUrl: "#",
        gallery: [
            {
                image: "/Projects/wonderkids/WonderKids - Hero section.webp",
                title: "Hero Section",
                description: "A vibrant, animated landing with playful typography and GSAP-powered entrance animations — instantly communicating that learning can be fun."
            },
            {
                image: "/Projects/wonderkids/WonderKids - features section.webp",
                title: "Features Section",
                description: "An interactive showcase of platform capabilities — interactive courses, gamified learning paths, and progress tracking for parents."
            },
            {
                image: "/Projects/wonderkids/WonderKids - about us page.webp",
                title: "About Us",
                description: "A warm, story-driven introduction to the WonderKids mission — building trust with parents through transparent values and team credibility."
            },
            {
                image: "/Projects/wonderkids/WonderKids - shop page.webp",
                title: "Shop Page",
                description: "A fully functional e-commerce catalog with course cards, pricing, and add-to-cart actions — designed for quick browsing and easy purchasing."
            },
            {
                image: "/Projects/wonderkids/WonderKids - CTA.webp",
                title: "Call-to-Action",
                description: "A compelling conversion section encouraging parents to start their child's learning journey — with bold visuals and clear action buttons."
            },
            {
                image: "/Projects/wonderkids/WonderKids - contact us page.webp",
                title: "Contact Page",
                description: "A clean, accessible contact form with GSAP scroll-reveal animations — making it easy for parents and institutions to reach out."
            }
        ]
    }
];
