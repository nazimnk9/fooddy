"use client";

import { Header } from "@/components/Header";
import Hero from "@/components/Hero";
import MenuCategories from "@/components/MenuCategories";
import HowToOrder from "@/components/HowToOrder";
import { AppDownload } from "@/components/AppDownload";
import PopularMenu from "@/components/PopularMenu";
import { DealCountdown } from "@/components/DealCountdown";
import { Restaurants } from "@/components/Restaurants";
import { Testimonials } from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUs";
import BlogSection from "@/components/BlogSection";
import { Gallery } from "@/components/Gallery";
import { Newsletter } from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <div className="min-h-screen bg-background">
            <Header />
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
            <Footer />
        </div>
    );
}
