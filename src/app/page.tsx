"use client";

import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Categories } from "@/components/Categories";
import { HowToOrder } from "@/components/HowToOrder";
import { AppDownload } from "@/components/AppDownload";
import { PopularDishes } from "@/components/PopularDishes";
import { DealCountdown } from "@/components/DealCountdown";
import { Restaurants } from "@/components/Restaurants";
import { Testimonials } from "@/components/Testimonials";
import { Features } from "@/components/Features";
import { Blog } from "@/components/Blog";
import { Gallery } from "@/components/Gallery";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";

export default function Home() {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main>
                <Hero />
                <Categories />
                <HowToOrder />
                {/* <AppDownload /> */}
                <PopularDishes />
                {/* <DealCountdown /> */}
                {/* <Restaurants />
                <Testimonials /> */}
                <Features />
                <Blog />
                {/* <Gallery /> */}
                <Newsletter />
            </main>
            <Footer />
        </div>
    );
}
