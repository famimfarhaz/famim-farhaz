"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  HelpCircle,
  LayoutList,
  Settings,
  Accessibility,
} from "lucide-react";
import { ElementType } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

type AccordionItemType = {
  icon: ElementType;
  value: string;
  question: string;
  answer: string;
};

const accordionItems: AccordionItemType[] = [
  {
    icon: HelpCircle,
    value: "item-1",
    question: "What makes your development approach unique?",
    answer:
      "I focus on understanding your business goals first, then translate them into clean, scalable code. Every project gets personalized attention with modern technologies like Next.js, React, and TypeScript.",
  },
  {
    icon: LayoutList,
    value: "item-2",
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary based on complexity. A landing page takes 1-2 weeks, while full-stack applications take 4-8 weeks. I provide detailed timelines during our initial consultation.",
  },
  {
    icon: Settings,
    value: "item-3",
    question: "Do you provide ongoing support after launch?",
    answer:
      "Absolutely! I offer maintenance packages including bug fixes, updates, and feature additions. Your success doesn't end at deployment—I'm here to help your product grow.",
  },
  {
    icon: Accessibility,
    value: "item-4",
    question: "Can you integrate AI features into my project?",
    answer:
      "Yes! I specialize in integrating AI chatbots, AI agents, and other intelligent features to enhance user experience and automate workflows. Let's discuss your specific needs.",
  },
];

export default function Accordion_01() {
  const sectionRef = useScrollAnimation();

  return (
    <section ref={sectionRef} id="faq" className="py-12 sm:py-16 md:py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-8 sm:mb-12 md:mb-16 scroll-animate">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3 sm:mb-4 text-balance text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
            Got questions? I've got answers. Learn more about my services, process, and how we can work together.
          </p>
        </div>

        {/* Accordion */}
        <div className="max-w-3xl mx-auto scroll-animate">
          <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
            {accordionItems.map(({ icon: Icon, value, question, answer }) => (
              <AccordionItem
                key={value}
                value={value}
                className="group border border-border/50 rounded-lg overflow-hidden transition-all duration-300 hover:border-accent/50 bg-card/30 backdrop-blur-sm hover:bg-card/50"
              >
                <AccordionTrigger className="flex items-center justify-between w-full px-4 sm:px-6 py-4 sm:py-5 bg-transparent text-left group-data-[state=open]:bg-accent/5 transition-colors [&[data-state=open]>svg]:rotate-0">
                  <div className="flex items-center gap-3 sm:gap-4 flex-1 pr-4">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors duration-300 border border-accent/20">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                    </div>
                    <span className="text-sm sm:text-base font-semibold text-foreground group-hover:text-accent transition-colors duration-300">
                      {question}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground group-data-[state=open]:text-accent transition-colors duration-300 font-mono hidden sm:inline">
                    {value.toUpperCase()}
                  </span>
                </AccordionTrigger>

                <AccordionContent className="relative px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/30 before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-accent before:opacity-0 group-data-[state=open]:before:opacity-100 transition-all duration-300 bg-accent/5">
                  <div className="pl-0 sm:pl-14">{answer}</div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
