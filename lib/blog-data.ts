export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  slug: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Boost Productivity with Automation",
    excerpt: "Discover how workflow automation and DevOps tools can streamline operations, reduce errors, and save your team valuable time.",
    date: "02-07-2025",
    category: "Productivity",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
    slug: "boost-productivity-automation",
  },
  {
    id: 2,
    title: "Securing Data in Cloud",
    excerpt: "Learn the best practices for protecting sensitive data in cloud environments, including encryption, access controls, and compliance.",
    date: "25-06-2025",
    category: "Security",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop",
    slug: "securing-data-cloud",
  },
  {
    id: 3,
    title: "Choosing the Right Tech",
    excerpt: "Explore a strategic approach to selecting software, tools, and platforms that align with your business goals and budget.",
    date: "10-06-2025",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026&auto=format&fit=crop",
    slug: "choosing-right-tech",
  },
  {
    id: 4,
    title: "Choosing Hosting Wisely",
    excerpt: "Choosing the right hosting plan is critical to your website's long-term success. In this guide, we break down how to evaluate hosting options.",
    date: "25-05-2025",
    category: "Hosting",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    slug: "choosing-hosting-wisely",
  },
  {
    id: 5,
    title: "Understanding DevOps Culture",
    excerpt: "Discover how embracing a DevOps culture can break down silos between development and operations teams, fostering seamless collaboration.",
    date: "12-05-2025",
    category: "DevOps",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
    slug: "understanding-devops-culture",
  },
  {
    id: 6,
    title: "Optimizing IT Infrastructure",
    excerpt: "Explore smart, future-focused strategies to modernize outdated systems, implement real-time monitoring tools, and manage your stack.",
    date: "05-05-2025",
    category: "Infrastructure",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop",
    slug: "optimizing-it-infrastructure",
  },
];
