import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

export function FaqsSection() {
    return (
        <div className="mx-auto w-full max-w-3xl space-y-7 px-4 pt-16">
            <div className="space-y-2">
                <h2 className="text-3xl font-bold md:text-4xl">Frequently Asked Questions</h2>
                <p className="text-muted-foreground max-w-2xl">
                    Common questions about my services, workflow, and how I can help bring your ideas to life.
                </p>
            </div>
            <Accordion
                type="single"
                collapsible
                className="bg-card dark:bg-card/50 w-full -space-y-px rounded-lg "
                defaultValue="item-1"
            >
                {questions.map((item) => (
                    <AccordionItem
                        value={item.id}
                        key={item.id}
                        className="relative border-x first:rounded-t-lg first:border-t last:rounded-b-lg last:border-b"
                    >
                        <AccordionTrigger className="px-4 py-4 text-[15px] leading-6 hover:no-underline">
                            {item.title}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pb-4 px-4">
                            {item.content}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
            <p className="text-muted-foreground">
                Have a different question?{' '}
                <a href="#contact" className="text-primary hover:underline">
                    Let's chat
                </a>
            </p>
        </div>
    );
}

const questions = [
    {
        id: 'item-1',
        title: 'What type of projects do you work on?',
        content:
            'I specialize in building modern websites and SaaS applications. This includes landing pages, full-stack web apps, dashboards, and custom business tools using technologies like Next.js, React, TypeScript, and Tailwind CSS.',
    },
    {
        id: 'item-2',
        title: 'How does the free demo work?',
        content:
            'The free demo is a no-strings-attached starter project. I build a small, functional piece of your idea so you can see my work quality firsthand before committing to a full project. It helps build trust and ensures we\'re a good fit.',
    },
    {
        id: 'item-3',
        title: 'What is your typical project timeline?',
        content:
            'Timelines vary based on project complexity. A simple landing page can be delivered in 1-2 weeks, while a full SaaS application may take 4-8 weeks. I\'ll provide a detailed timeline estimate after our initial discussion.',
    },
    {
        id: 'item-4',
        title: 'Do you offer ongoing support and maintenance?',
        content:
            'Yes! After launch, I offer maintenance packages that include bug fixes, performance optimization, feature updates, and security patches to keep your application running smoothly.',
    },
    {
        id: 'item-5',
        title: 'What technologies do you use?',
        content:
            'My core stack includes Next.js, React, TypeScript, Tailwind CSS, and Node.js. For databases, I work with PostgreSQL, Supabase, and Firebase. I choose the best tools based on your project\'s specific needs.',
    },
    {
        id: 'item-6',
        title: 'How do we communicate during the project?',
        content:
            'I believe in clear, consistent communication. We can use your preferred platform—WhatsApp, Slack, Discord, or email. I provide regular updates and am always available to answer questions.',
    },
    {
        id: 'item-7',
        title: 'What are your payment terms?',
        content:
            'I typically work with a 50% upfront deposit, with the remaining 50% due upon project completion. For larger projects, we can arrange milestone-based payments. All terms are discussed and agreed upon before starting.',
    },
];
