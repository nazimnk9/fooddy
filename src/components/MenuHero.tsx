import Link from "next/link";
import menuHeroBg from "@/assets/menu-hero.jpg";

export const MenuHero = () => {
    return (
        <section
            className="hero-banner"
            style={{ backgroundImage: `url(${menuHeroBg.src})` }}
        >
            <div className="hero-banner-overlay" />
            <div className="relative z-10 text-center">
                <h1 className="text-5xl md:text-7xl font-display font-normal text-white mb-6 tracking-wide">
                    MENU
                </h1>
                <nav className="flex items-center justify-center gap-3 text-sm">
                    <Link href="/" className="breadcrumb-link uppercase tracking-wider">
                        Home
                    </Link>
                    <span className="text-white/50">|</span>
                    <span className="breadcrumb-active uppercase tracking-wider">
                        Menu
                    </span>
                </nav>
            </div>
        </section>
    );
};