"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

interface GalleryHoverCarouselItem {
    id: string;
    title: string;
    summary: string;
    url: string;
    image: string;
    videoUrl?: string;
}

export default function GalleryHoverCarousel({
    heading = "Featured Projects",
    demoUrl = "#",
    items = [
        {
            id: "item-1",
            title: "GiGi — Premium Energy Brand",
            summary: "A bold e-commerce platform for a premium energy drink brand with immersive product storytelling.",
            url: "/projects/gigi-energy",
            image: "",
            videoUrl: "/videos/gigi-website.webm",
        },
        {
            id: "item-2",
            title: "LuminisDigital — Agency Website",
            summary: "A refined, animation-driven marketing website for a boutique digital agency with GSAP-powered interactions.",
            url: "/projects/luminis-digital",
            image: "",
            videoUrl: "/videos/luminisdigital.webm",
        },
        {
            id: "item-3",
            title: "SkitBit — 3D Animation Studio",
            summary: "An immersive WebGL-enhanced portfolio for a premium 3D animation studio with cinematic storytelling.",
            url: "/projects/skitbit-studio",
            image: "",
            videoUrl: "/videos/skitbit-website.webm",
        },
        {
            id: "item-4",
            title: "TakaTrack — Finance Platform",
            summary: "A full-stack personal finance platform for Bangladeshi users with expense tracking and visual analytics.",
            url: "/projects/takatrack",
            image: "",
            videoUrl: "/videos/takatrack.webm",
        },
        {
            id: "item-5",
            title: "WonderKids — Learning Platform",
            summary: "A playful e-commerce learning platform for children with GSAP animations and a custom cart system.",
            url: "/projects/wonderkids",
            image: "",
            videoUrl: "/videos/wonderkids.webm",
        }
    ],
}: {
    heading?: string;
    demoUrl?: string;
    items?: GalleryHoverCarouselItem[];
}) {
    const [carouselApi, setCarouselApi] = useState<CarouselApi>();
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    // Carousel scroll tracking
    useEffect(() => {
        if (!carouselApi) return;
        const update = () => {
            setCanScrollPrev(carouselApi.canScrollPrev());
            setCanScrollNext(carouselApi.canScrollNext());
        };
        update();
        carouselApi.on("select", update);
        return () => {
            carouselApi.off("select", update);
        };
    }, [carouselApi]);

    return (
        <section className="py-32 bg-background">
            <div className="container mx-auto px-6">
                <div className="mb-8 flex flex-col justify-between md:mb-14 md:flex-row md:items-end lg:mb-16">
                    <div className="max-w-2xl">
                        <h3 className="text-xl sm:text-2xl lg:text-4xl font-bold text-foreground leading-tight tracking-tight">
                            {heading}{" "}
                            <span className="text-muted-foreground block mt-2 text-lg sm:text-xl lg:text-2xl font-normal">
                                Explore my collection of innovative solutions and cutting-edge technologies.
                            </span>
                        </h3>
                    </div>
                    <div className="flex gap-2 mt-4 md:mt-0">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => carouselApi?.scrollPrev()}
                            disabled={!canScrollPrev}
                            className="h-10 w-10 rounded-full"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => carouselApi?.scrollNext()}
                            disabled={!canScrollNext}
                            className="h-10 w-10 rounded-full"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="w-full max-w-full">
                    <Carousel
                        setApi={setCarouselApi}
                        opts={{
                            align: "start",
                            slidesToScroll: 1,
                            breakpoints: { "(max-width: 768px)": { dragFree: true } }
                        }}
                        className="relative w-full max-w-full"
                    >
                        <CarouselContent className="-ml-4 hide-scrollbar w-full max-w-full">
                            {items.map((item) => (
                                <CarouselItem key={item.id} className="pl-4 md:max-w-[500px]">
                                    <Link href={item.url} className="group block relative w-full aspect-[16/9]">
                                        <Card className="overflow-hidden rounded-xl h-full w-full rounded-3xl border-border/50 bg-card/50 backdrop-blur-sm">
                                            {/* Media Content */}
                                            <div className="relative h-full w-full">
                                                {item.videoUrl ? (
                                                    <video
                                                        autoPlay
                                                        muted
                                                        loop
                                                        playsInline
                                                        className="h-full w-full object-cover"
                                                    >
                                                        <source src={item.videoUrl} type="video/webm" />
                                                    </video>
                                                ) : (
                                                    <Image
                                                        width={1280}
                                                        height={720}
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                )}
                                            </div>
                                        </Card>
                                    </Link>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
            </div>
        </section>
    );
}
