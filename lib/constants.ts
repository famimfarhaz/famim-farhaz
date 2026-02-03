export const packages = [
    {
        key: "startup",
        name: "Startup Pack",
        price: 1500,
        subtitle: "Perfect to get started",
        badge: "Best for solopreneurs",
        included: [
            "Basic website development",
            "RAG model integration (Basic)",
            "Project management software",
            "Dashboard & analysis tool",
        ],
        notIncluded: ["Custom SaaS features", "Advanced RAG"],
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
            "Mid-range RAG model",
            "Dashboard & analysis tool",
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
            "RAG model for e-commerce",
            "Admin Panel & CRM",
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
            "Advanced RAG model (Monthly)",
            "Project management software",
        ],
        notIncluded: ["Dedicated manager", "24/7 priority support"],
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

    // AI/RAG Solutions
    { name: "RAG Models (Chatbot & Document Search)", price: 800, category: "AI/RAG Solutions", description: "AI assistant trained on your documents and data", comingSoon: false },
    { name: "AI Content Assistant", price: 600, category: "AI/RAG Solutions", description: "Generate marketing copy, emails and reports with AI", comingSoon: false },
    { name: "Email Reply Automation", price: 500, category: "AI/RAG Solutions", description: "Auto-draft responses to customer emails intelligently", comingSoon: false },
]
