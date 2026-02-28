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
        slug: "anime-website",
        title: "AnimeSphere Platform",
        description: "A comprehensive anime streaming platform with advanced user management, social features, and AI-powered interaction systems.",
        about: "AnimeSphere is an advanced full-stack anime streaming platform built to showcase modern web development capabilities. This project features comprehensive user management, real-time social interactions, custom animated badges, and sophisticated content systems using React, TypeScript, and Supabase.",
        image: "https://i.postimg.cc/P5CHscXT/Website-Home.png",
        techStack: ["React", "TypeScript", "Supabase", "Tailwind CSS", "Framer Motion", "Google Gemini AI", "Vite", "PostgreSQL"],
        category: "practice",
        timeline: "2024",
        role: "Full Stack Developer",
        liveUrl: "https://animespheree.netlify.app/",
        githubUrl: "#",
        gallery: [
            {
                image: "https://i.postimg.cc/P5CHscXT/Website-Home.png",
                title: "Homepage",
                description: "Modern anime streaming homepage with featured content"
            },
            {
                image: "https://i.postimg.cc/J44mK0SQ/Profile.png",
                title: "User Profile System",
                description: "Comprehensive user profiles with stats, badges, and social features"
            },
            {
                image: "https://i.postimg.cc/nccZTrN4/Comment-Section.png",
                title: "Comment System",
                description: "Real-time commenting with AI moderation and reactions"
            },
            {
                image: "https://i.postimg.cc/X773xqts/Animated-Badges.png",
                title: "Animated Badge System",
                description: "Custom animated badges with role-based permissions"
            }
        ]
    },



    {
        slug: "seren",
        title: "SEREN",
        description: "Luxury fashion e-commerce platform with advanced filtering and premium UI/UX.",
        about: "SEREN is a luxury fashion e-commerce platform designed with a focus on high-end aesthetics. It features advanced product filtering, a multi-step checkout process, and a premium user experience tailored for high-ticket fashion items.",
        image: "https://i.postimg.cc/SsDCKbKR/Hero_section.png",
        techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Radix UI"],
        category: "practice",
        timeline: "2024",
        role: "Frontend Developer",
        liveUrl: "#",
        githubUrl: "#",
        gallery: []
    },
    {
        slug: "vector-ai",
        title: "Vector AI",
        description: "Advanced AI assistant with Google Gemini, web search, and image generation.",
        about: "Vector AI is a comprehensive AI assistant leveraging the latest in Gemini AI technology. It includes real-time web search capabilities, high-quality image generation via Flux, and text-to-speech features, all wrapped in a sleek, modern interface.",
        image: "https://i.postimg.cc/FKnXgQDW/Chat.png",
        techStack: ["Next.js 16", "React 19", "TypeScript", "Google Gemini AI", "Radix UI", "Three.js"],
        category: "practice",
        timeline: "2024",
        role: "Full Stack Developer",
        liveUrl: "#",
        githubUrl: "#",
        gallery: []
    }
];
