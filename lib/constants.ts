export const packages = [
    {
        key: "startup",
        name: "Startup Pack",
        price: 1500,
        subtitle: "Perfect to get started",
        badge: "Best for solopreneurs",
        included: [
            "Basic website development",
            "Project management software",
            "Dashboard & analysis tool",
            "SEO optimization basics",
        ],
        notIncluded: ["Custom SaaS features", "Payment integration"],
    },
    {
        key: "business",
        name: "Business Pack",
        price: 3500,
        subtitle: "Best for scaling businesses",
        popular: true,
        badge: "Most Popular",
        included: [
            "Advanced website development",
            "SaaS development (simple features)",
            "Dashboard & analysis tool",
            "Priority support",
        ],
        notIncluded: ["E-commerce functionality", "Dedicated admin panel"],
    },
    {
        key: "ecommerce",
        name: "E-commerce Pack",
        price: 5000,
        subtitle: "For online shops & stores",
        included: [
            "E-commerce website development",
            "Cart, Payment, Product Mgmt",
            "Admin Panel & CRM",
            "Inventory management",
        ],
        notIncluded: ["Custom SaaS unrelated to e-com"],
    },
    {
        key: "agency",
        name: "Agency Pack",
        price: 8000,
        subtitle: "For bigger teams / agencies",
        included: [
            "Advanced website development",
            "Custom SaaS development",
            "Project management software",
            "Dedicated support (Monthly)",
        ],
        notIncluded: ["Dedicated manager", "In-person consulting"],
    },
]

export const servicePrices = [
    // Website Development
    { name: "Full Stack Website", price: 1500, category: "Website Development", description: "Modern, responsive business website built end-to-end", comingSoon: false },
    { name: "E-commerce Website", price: 2500, category: "Website Development", description: "Online store with cart, checkout and payment integration", comingSoon: false },
    { name: "Admin Panel (for website / e-com)", price: 1000, category: "Website Development", description: "Secure dashboard to manage content, users and orders", comingSoon: false },

    // SaaS Solutions
    { name: "CRM (SaaS)", price: 3000, category: "SaaS Solutions", description: "Track leads, customers and sales pipeline in one place", comingSoon: false },
    { name: "ERP (SaaS)", price: 5000, category: "SaaS Solutions", description: "Inventory, accounts, HR – everything in a single system", comingSoon: false },
    { name: "Project & Team Management (SaaS)", price: 4000, category: "SaaS Solutions", description: "Tasks, deadlines and team collaboration in one tool", comingSoon: false },
    { name: "Dashboard & Analytics", price: 700, category: "SaaS Solutions", description: "Real-time KPIs and reports tailored to your business", comingSoon: false },

    // Add-ons & Support
    { name: "Ongoing Maintenance & Support", price: 300, category: "SaaS Solutions", description: "Updates, backups and security handled for you", comingSoon: false },
]
