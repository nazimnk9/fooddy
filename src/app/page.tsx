"use client";

import Hero from "@/components/Hero";
import MenuCategories from "@/components/MenuCategories";
import HowToOrder from "@/components/HowToOrder";
import PopularMenu from "@/components/PopularMenu";
import WhyChooseUs from "@/components/WhyChooseUs";
import BlogSection from "@/components/BlogSection";

export default function Home() {
    return (
        <div className="bg-background">
            <main>
                <Hero />
                <MenuCategories />
                <HowToOrder />
                {/* <AppDownload /> */}
                <PopularMenu />
                {/* <DealCountdown /> */}
                {/* <Restaurants />
                <Testimonials /> */}
                <WhyChooseUs />
                <BlogSection />
                {/* <Gallery /> */}
                {/* <Newsletter /> */}
            </main>
        </div>
    );
}
