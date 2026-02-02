"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useAnimation, AnimatePresence } from "framer-motion";
import { Phone, MapPin, Facebook, Music, Mail, Instagram, Globe } from "lucide-react";

export default function AboutPage() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Parallax effect: Image moves vertically inside its fixed-size container
    const y1 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
    const y2 = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

    // Slider Data - Preserving User's manual change for 'Global Presence' image
    const sliderItems = [
        { year: "2000", title: "Branch in NYC", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800" },
        { year: "2019", title: "Reward from Tiqil", img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800" },
        { year: "1990", title: "Journey Begins", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800" },
        { year: "2024", title: "Global Presence", img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800" }
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
                        <h1 className="text-[#c5a059] text-4xl md:text-6xl lg:text-7xl font-light italic relative z-10">
                            About
                        </h1>
                    </div>
                    <p className="text-3xl md:text-6xl lg:text-8xl font-normal leading-tight mt-2 md:mt-4 relative z-10 text-black">
                        our restaurant
                    </p>
                </div>
            </section>

            {/* Main Content Section - Stacked on Mobile, Side-by-side on Desktop */}
            <section ref={sectionRef} className="container mx-auto px-4 py-8 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

                    {/* Left/Top: Large Image Container */}
                    <div className="w-full h-[400px] md:h-[600px] lg:h-[700px] rounded-lg overflow-hidden border border-white/5 bg-[#0a1f1a] relative">
                        <motion.div
                            style={{ y: y1, scale: 1.2 }}
                            className="absolute inset-0 w-full h-[120%]"
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1000"
                                alt="Our Story"
                                fill
                                className="object-fixed" // Preserving user preference
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
                                className="object-contain"
                            />
                        </div>

                        <div className="space-y-6 md:space-y-8 max-w-2xl mx-auto lg:mx-0">
                            <h2 className="text-3xl md:text-5xl lg:text-7xl font-normal leading-[1.05] text-black">
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
                            <div className="relative aspect-[4/4] rounded-lg overflow-hidden border border-white/10 shadow-3xl bg-[#0a1f1a]">
                                <motion.div
                                    style={{ y: y2, scale: 1.3 }}
                                    className="absolute inset-0 w-full h-[130%]"
                                >
                                    <Image
                                        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800"
                                        alt="Featured Dish"
                                        fill
                                        className="object-fixed" // Preserving user preference
                                    />
                                </motion.div>
                            </div>

                            {/* Opening Hours */}
                            <div className="flex flex-col justify-center space-y-4 md:space-y-6 text-left">
                                <h3 className="text-lg md:text-2xl lg:text-lg font-light tracking-wide text-[#c5a059]">Opening Hours</h3>
                                <div className="space-y-2 md:space-y-3">
                                    <div className="border-l-2 border-[#c5a059]/30 pl-4 py-1">
                                        <p className="text-gray-500 text-sm md:text-base lg:text-sm uppercase tracking-widest font-medium">Mon — Thu</p>
                                        <p className="text-base md:text-xl lg:text-base text-black font-light mt-1">10.00 am — 01:00 am</p>
                                    </div>
                                    <div className="border-l-2 border-[#c5a059]/30 pl-4 py-1">
                                        <p className="text-gray-500 text-sm md:text-base lg:text-sm uppercase tracking-widest font-medium">Fri — Sun</p>
                                        <p className="text-base md:text-xl lg:text-base text-black font-light mt-1">10:00 am — 02:00 am</p>
                                    </div>
                                </div>

                                {/* Contact Information Section - Matching Image */}
                                <div className="pt-4 space-y-6">
                                    <div className="flex flex-col items-start gap-4">
                                        {[
                                            { Icon: Phone, text: "344 433 5555" },
                                            { Icon: MapPin, text: "Piazza dei mirti 19, Roma, Italy" },
                                            { Icon: Facebook, text: "Dawat Restaurante / Dawat Mirti" },
                                            { Icon: Music, text: "dawatrestaurant19" },
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
                                    <span className="text-[#c5a059] text-sm md:text-lg font-medium tracking-[0.3em]">{item.year}</span>
                                    <h3 className="text-xl md:text-4xl lg:text-5xl font-normal mt-1 group-hover:text-[#c5a059] transition-all duration-700 ease-out text-black">{item.title}</h3>
                                </div>
                                <div className="relative aspect-[16/10] md:aspect-[4/3] rounded-md overflow-hidden bg-black/40">
                                    <Image
                                        src={item.img}
                                        alt={item.title}
                                        fill
                                        className="object-fixed transition-transform duration-[1.5s] ease-out group-hover:scale-110 pointer-events-none"
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
