"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useAnimation, AnimatePresence } from "framer-motion";
import { Phone, MapPin, Facebook, Mail, Instagram, Globe } from "lucide-react";
import hero2 from '@/assets/dawat_e_1.jpg';
import hero1 from '@/assets/dawat_m.jpg';

import show1 from '@/assets/show1.jpg';
import love1 from '@/assets/loves1.jpg';
import comfo from '@/assets/comfo.jpg';
import community from '@/assets/community.jpg';
import importance from '@/assets/importance.jpg';

const TikTokIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#0b241e]">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
);

export default function AboutPage() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Parallax effect: Image moves vertically inside its fixed-size container
    const yMainImage = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
    const ySmallImage = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);


    // Slider Data - Preserving User's manual change for 'Global Presence' image
    const sliderItems = [
        { year: "2025", title: "Journey Begins", img: show1, pos: "object-center" },
        { year: "2026", title: "Getting more loves", img: love1, pos: "object-center" },
        { year: "2025", title: "All about Comfort", img: comfo, pos: "object-center" },
        { year: "2026", title: "Community Love", img: community, pos: "object-center" },
        { year: "2026", title: "Care about your Importance", img: importance, pos: "object-center" }
    ];

    // Triple buffer for truly seamless infinite loop (even during drag)
    const displayItems = [...sliderItems, ...sliderItems, ...sliderItems];

    // Slider Logic
    const [currentIndex, setCurrentIndex] = useState(sliderItems.length); // Start in the middle set
    const [isHovered, setIsHovered] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [isDragging, setIsDragging] = useState(false);

    // Dynamic Width Calculation for Responsiveness
    // Requirement: "show full responsive for all devices... only show one item for all mobile devices but when change slider... one item wise change slider"
    const [itemWidth, setItemWidth] = useState(498);
    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateWidth = () => {
            if (sliderRef.current) {
                const items = sliderRef.current.querySelectorAll('.slider-item');
                if (items.length >= 2) {
                    const rect1 = items[0].getBoundingClientRect();
                    const rect2 = items[1].getBoundingClientRect();
                    // Distance between start of item 1 and start of item 2 (includes current gap)
                    setItemWidth(rect2.left - rect1.left);
                } else if (items.length === 1) {
                    setItemWidth(items[0].clientWidth);
                }
            }
        };

        // Initial measurement
        updateWidth();

        // Use a small timeout to ensure DOM has settled for accurate measurement
        const timer = setTimeout(updateWidth, 100);

        window.addEventListener('resize', updateWidth);
        return () => {
            window.removeEventListener('resize', updateWidth);
            clearTimeout(timer);
        };
    }, []);

    const handleNext = () => {
        setIsTransitioning(true);
        setCurrentIndex(prev => prev + 1);
    };

    const handlePrev = () => {
        setIsTransitioning(true);
        setCurrentIndex(prev => prev - 1);
    };

    // Auto-loop snap logic for both auto and drag
    useEffect(() => {
        if (currentIndex >= sliderItems.length * 2) {
            const timer = setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(currentIndex - sliderItems.length);
            }, 800);
            return () => clearTimeout(timer);
        } else if (currentIndex < sliderItems.length) {
            const timer = setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(currentIndex + sliderItems.length);
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [currentIndex, sliderItems.length]);

    // Auto-play effect
    useEffect(() => {
        if (isHovered || isDragging) return;

        const timer = setInterval(() => {
            handleNext();
        }, 4000);

        return () => clearInterval(timer);
    }, [isHovered, isDragging, currentIndex]);

    const xOffset = -(currentIndex * itemWidth);

    return (
        <div className="bg-[#fff] text-white min-h-screen font-serif selection:bg-[#c5a059]/30 overflow-x-hidden">
            {/* Hero Section - Matching Image 0 & 3 */}
            <section className="relative pt-24 md:pt-40 pb-12 md:pb-24 px-4 flex flex-col items-center justify-center overflow-hidden">
                <div className="relative z-10 text-center">
                    <div className="relative inline-block">
                        {/* Decorative Circle - Centered on "About" */}
                        <div className="absolute left-1/2 top-[100%] -translate-x-1/2 -translate-y-1/2 border-[0.5px] border-[#c5a059]/40 rounded-full w-[150px] h-[150px] md:w-[300px] md:h-[300px] pointer-events-none" />
                        <h1 className="text-[#c5a059] text-4xl md:text-5xl lg:text-6xl font-light italic relative z-10">
                            About
                        </h1>
                    </div>
                    <p className="text-3xl md:text-5xl lg:text-6xl font-normal leading-tight mt-2 md:mt-4 relative z-10 text-black">
                        Dawat
                    </p>
                    <p className="text-muted-foreground mt-2 font-normal ">Restaurant & Grill</p>
                </div>
            </section>

            {/* Main Content Section - Stacked on Mobile, Side-by-side on Desktop */}
            <section ref={sectionRef} className="container mx-auto px-4 py-8 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

                    {/* Left/Top: Large Image Container */}
                    <div className="relative w-full h-[400px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-lg bg-[#0a1f1a]">
                        <motion.div style={{ y: yMainImage }} className="absolute inset-0">
                            <Image
                            src= {hero2}
                            alt="Our Story"
                            fill
                            className="object-cover scale-[1.25]"
                            priority
                            />
                        </motion.div>
                    </div>


                    {/* Right/Bottom: Content Area */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-10 md:space-y-16">
                        {/* Floral Icon - Matching Image 1/4 */}
                        <div className="opacity-90 scale-125 md:scale-150 relative w-20 h-20">
                            <Image
                                src="/halal-removebg-preview.png"
                                alt="Halal Certified"
                                fill
                                className="object-fixed"
                            />
                        </div>

                        <div className="space-y-6 md:space-y-8 max-w-2xl mx-auto lg:mx-0">
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal leading-[1.05] text-black">
                                Around the world, one plate at a time
                            </h2>

                            <div className="w-20 h-[1px] bg-[#c5a059]/40 mx-auto lg:mx-0 md:hidden" />

                            <p className="text-gray-400 text-base md:text-xl leading-relaxed font-light">
                                Welcome to <span className="text-black font-bold italic">La.Revi</span>, one of the best restaurants in the country. This is the place where food meets passion and where the world\'s finest chefs are creating the culinary masterpieces.
                            </p>
                        </div>

                        {/* Bottom Row - Responsive Layout */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 w-full pt-4">
                            {/* Small Image Container */}
                            <div className="relative aspect-square overflow-hidden rounded-lg bg-[#0a1f1a]">
                                <motion.div style={{ y: ySmallImage }} className="absolute inset-0">
                                    <Image
                                    src= {hero1}
                                    alt="Featured Dish"
                                    fill
                                    className="object-cover object-[50%_35%] scale-[1.05]"
                                    />
                                </motion.div>
                            </div>


                            {/* Opening Hours */}
                            <div className="flex flex-col justify-center space-y-4 md:space-y-6 text-left">
                                <h3 className="text-lg md:text-2xl lg:text-lg font-light tracking-wide text-[#c5a059]">Opening Hours</h3>
                                <div className="space-y-2 md:space-y-3">
                                    <div className="border-l-2 border-[#c5a059]/30 pl-4 py-1">
                                        <p className="text-gray-500 text-sm md:text-base lg:text-sm uppercase tracking-widest font-medium">All week days</p>
                                        <p className="text-base md:text-xl lg:text-base text-black font-light mt-1">7:30 am — 11:00 PM</p>
                                    </div>
                                </div>

                                {/* Contact Information Section - Matching Image */}
                                <div className="pt-4 space-y-6">
                                    <div className="flex flex-col items-start gap-4">
                                        {[
                                            { Icon: Phone, text: "344 433 5555" },
                                            { Icon: MapPin, text: "Piazza dei mirti 19, Roma, Italy" },
                                            { Icon: Facebook, text: "Dawat Restaurante / Dawat Mirti" },
                                            { Icon: TikTokIcon, text: "dawatrestaurant19" },
                                            { Icon: Mail, text: "dawatristoranteroma@gmail.com" },
                                            { Icon: Instagram, text: "dawat_ristorante" },
                                            { Icon: Globe, text: "www.dawatsrls.com" },
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex flex-row gap-2 justify-center items-start space-y-2 group">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c5a059] via-[#e2c792] to-[#c5a059] flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
                                                    <item.Icon className="w-5 h-5 text-[#0b241e]" />
                                                </div>
                                                <span className="text-black text-sm md:text-base font-medium tracking-wide">
                                                    {item.text}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Branch Slider Section - Enhanced Shadows and Mobile Scaling */}
            <section className="py-20 md:py-32 relative overflow-hidden">
                {/* Premium Lateral Shadows - Visible on larger screens */}
                {/* <div className="absolute top-0 left-0 bottom-0 w-32 md:w-80 bg-gradient-to-r from-[#0b241e] via-[#0b241e]/80 to-transparent z-20 pointer-events-none hidden md:block" />
                <div className="absolute top-0 right-0 bottom-0 w-32 md:w-80 bg-gradient-to-l from-[#0b241e] via-[#0b241e]/80 to-transparent z-20 pointer-events-none hidden md:block" /> */}

                <div
                    className="relative cursor-grab active:cursor-grabbing h-full"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    ref={sliderRef}
                >
                    <motion.div
                        className="flex flex-nowrap gap-8 md:gap-16 md:px-0"
                        drag="x"
                        dragConstraints={{ left: -(displayItems.length - 1) * itemWidth, right: 0 }}
                        animate={{ x: xOffset }}
                        transition={isTransitioning ? {
                            type: "spring",
                            stiffness: 80,
                            damping: 18,
                            mass: 1.2
                        } : { duration: 0 }}
                        onDragStart={() => {
                            setIsDragging(true);
                            setIsTransitioning(false);
                        }}
                        onDragEnd={(e, info) => {
                            setIsDragging(false);
                            const threshold = 50;
                            if (info.offset.x < -threshold) {
                                handleNext();
                            } else if (info.offset.x > threshold) {
                                handlePrev();
                            } else {
                                setIsTransitioning(true);
                                setCurrentIndex(prev => prev);
                            }
                        }}
                    >
                        {displayItems.map((item, id) => (
                            <div
                                key={id}
                                className="slider-item flex-shrink-0 w-screen px-4 md:px-4 md:w-[500px] lg:w-[500px] group select-none"
                            >
                                <div className="mb-6 md:mb-10 space-y-2">
                                    {/* <span className="text-[#c5a059] text-sm md:text-lg font-medium tracking-[0.3em]">{item.year}</span> */}
                                    <h3 className="text-xl md:text-4xl lg:text-5xl font-normal mt-1 group-hover:text-[#c5a059] transition-all duration-700 ease-out text-black">{item.title}</h3>
                                </div>
                                <div className="relative aspect-[16/10] md:aspect-[4/3] rounded-md overflow-hidden bg-black/40">
                                    <Image
                                        src={item.img}
                                        alt={item.title}
                                        fill
                                        className={`object-cover ${item.pos} transition-transform duration-[1.5s] ease-out group-hover:scale-110 pointer-events-none`}
                                    />

                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Page Scroll Up Indicator Matching Image 1/2 */}
            <div className="fixed bottom-8 right-8 z-50 md:bottom-12 md:right-12">
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#c5a059]/80 text-[#0b241e] flex items-center justify-center hover:bg-[#c5a059] transition-all duration-300 shadow-xl group"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:-translate-y-1 transition-transform">
                        <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>

            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                  display: none;
                }
                .no-scrollbar {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}
