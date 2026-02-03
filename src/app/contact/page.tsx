"use client";
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Globe, Facebook, Instagram, ExternalLink } from 'lucide-react';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const contactInfo = [
    {
        icon: Phone,
        label: 'Phone / WhatsApp',
        value: '+8801764641646',
        href: 'https://wa.me/8801764641646',
        isWhatsApp: true,
    },
    {
        icon: Mail,
        label: 'Email',
        value: 'dawat@gmail.com',
        href: 'mailto:dawat@gmail.com',
    },
    {
        icon: Globe,
        label: 'Website',
        value: 'dawatsrls.com',
        href: 'https://dawatsrls.com',
    },
    {
        icon: MapPin,
        label: 'Location',
        value: 'Piazza dei Mirti 19, Roma, Italy',
        href: 'https://maps.google.com/?q=Piazza+dei+Mirti+19,+Roma,+Italy',
    },
];

const socialLinks = [
    {
        icon: Facebook,
        label: 'Facebook',
        href: 'https://facebook.com/dawat',
        color: 'hover:bg-blue-600',
    },
    {
        icon: Instagram,
        label: 'Instagram',
        href: 'https://instagram.com/dawat',
        color: 'hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500',
    },
    {
        icon: () => (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
        ),
        label: 'TikTok',
        href: 'https://tiktok.com/@dawat',
        color: 'hover:bg-black',
    },
];

const Contact = () => {
    return (
        <div className="min-h-screen bg-background">
            {/* <Navbar /> */}

            <main className="pt-10">
                {/* Hero Section */}
                <section className="text-black py-6 md:py-6">
                    <div className="container-custom text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                        >
                            Get In Touch
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-black/70 text-lg max-w-2xl mx-auto"
                        >
                            We'd love to hear from you. Reach out through any of the channels below.
                        </motion.p>
                    </div>
                </section>

                {/* Contact Content */}
                <section className="section-padding">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                            {/* Left Column - Contact Info */}
                            <div className="space-y-8">
                                {/* Contact Cards */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    className="space-y-4"
                                >
                                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                                        Contact Information
                                    </h2>

                                    {contactInfo.map((item, index) => {
                                        const isLocation = item.label === 'Location';
                                        const Content = (
                                            <>
                                                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                                                    <item.icon className="w-5 h-5 text-accent-foreground" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                                                    <p className={`font-medium text-foreground ${!isLocation ? 'group-hover:text-accent' : ''} transition-colors break-all`}>
                                                        {item.value}
                                                    </p>
                                                    {item.isWhatsApp && (
                                                        <span className="inline-flex items-center gap-1 text-xs text-green-600 mt-1">
                                                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                                            </svg>
                                                            WhatsApp Available
                                                        </span>
                                                    )}
                                                </div>
                                                {!isLocation && <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0" />}
                                            </>
                                        );

                                        const commonProps = {
                                            key: item.label,
                                            initial: { opacity: 0, y: 20 },
                                            whileInView: { opacity: 1, y: 0 },
                                            viewport: { once: true },
                                            transition: { duration: 0.4, delay: index * 0.1 },
                                            className: `flex items-start gap-4 p-4 rounded-lg bg-secondary transition-all duration-300 group ${!isLocation ? 'hover:bg-secondary/80 card-hover cursor-pointer' : 'cursor-default'}`
                                        };

                                        return isLocation ? (
                                            <motion.div {...commonProps}>
                                                {Content}
                                            </motion.div>
                                        ) : (
                                            <motion.a
                                                {...commonProps}
                                                href={item.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {Content}
                                            </motion.a>
                                        );
                                    })}
                                </motion.div>

                                {/* Social Links */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                >
                                    <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
                                        Follow Us
                                    </h3>
                                    <div className="flex gap-4">
                                        {socialLinks.map((social) => (
                                            <a
                                                key={social.label}
                                                href={social.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center transition-all duration-300 hover:bg-accent hover:text-accent-foreground"
                                                aria-label={social.label}
                                            >
                                                <social.icon />
                                            </a>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* QR Code Section */}
                                {/* <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-secondary rounded-xl p-6 text-center"
                >
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
                    Scan Me
                  </h3>
                  <div className="inline-block bg-white p-4 rounded-lg shadow-md"> */}
                                {/* QR Code - Generated SVG for dawatsrls.com */}
                                {/* <svg
                      viewBox="0 0 256 256"
                      className="w-40 h-40 md:w-48 md:h-48"
                    >
                      <rect width="256" height="256" fill="white"/> */}
                                {/* QR Code Pattern */}
                                {/* <g fill="black"> */}
                                {/* Position Detection Patterns */}
                                {/* Top-left */}
                                {/* <rect x="16" y="16" width="56" height="56"/>
                        <rect x="24" y="24" width="40" height="40" fill="white"/>
                        <rect x="32" y="32" width="24" height="24"/> */}

                                {/* Top-right */}
                                {/* <rect x="184" y="16" width="56" height="56"/>
                        <rect x="192" y="24" width="40" height="40" fill="white"/>
                        <rect x="200" y="32" width="24" height="24"/> */}

                                {/* Bottom-left */}
                                {/* <rect x="16" y="184" width="56" height="56"/>
                        <rect x="24" y="192" width="40" height="40" fill="white"/>
                        <rect x="32" y="200" width="24" height="24"/>
                         */}
                                {/* Timing patterns */}
                                {/* <rect x="80" y="48" width="8" height="8"/>
                        <rect x="96" y="48" width="8" height="8"/>
                        <rect x="112" y="48" width="8" height="8"/>
                        <rect x="128" y="48" width="8" height="8"/>
                        <rect x="144" y="48" width="8" height="8"/>
                        <rect x="160" y="48" width="8" height="8"/>
                        
                        <rect x="48" y="80" width="8" height="8"/>
                        <rect x="48" y="96" width="8" height="8"/>
                        <rect x="48" y="112" width="8" height="8"/>
                        <rect x="48" y="128" width="8" height="8"/>
                        <rect x="48" y="144" width="8" height="8"/>
                        <rect x="48" y="160" width="8" height="8"/> */}

                                {/* Data modules - decorative pattern representing URL */}
                                {/* <rect x="80" y="80" width="8" height="8"/>
                        <rect x="96" y="80" width="8" height="8"/>
                        <rect x="120" y="80" width="8" height="8"/>
                        <rect x="144" y="80" width="8" height="8"/>
                        <rect x="168" y="80" width="8" height="8"/>
                        
                        <rect x="80" y="96" width="8" height="8"/>
                        <rect x="112" y="96" width="8" height="8"/>
                        <rect x="128" y="96" width="8" height="8"/>
                        <rect x="160" y="96" width="8" height="8"/>
                        
                        <rect x="96" y="112" width="8" height="8"/>
                        <rect x="120" y="112" width="8" height="8"/>
                        <rect x="136" y="112" width="8" height="8"/>
                        <rect x="152" y="112" width="8" height="8"/>
                        <rect x="168" y="112" width="8" height="8"/>
                        
                        <rect x="80" y="128" width="8" height="8"/>
                        <rect x="104" y="128" width="8" height="8"/>
                        <rect x="128" y="128" width="8" height="8"/>
                        <rect x="144" y="128" width="8" height="8"/>
                        <rect x="168" y="128" width="8" height="8"/>
                        
                        <rect x="88" y="144" width="8" height="8"/>
                        <rect x="112" y="144" width="8" height="8"/>
                        <rect x="136" y="144" width="8" height="8"/>
                        <rect x="160" y="144" width="8" height="8"/>
                        
                        <rect x="80" y="160" width="8" height="8"/>
                        <rect x="96" y="160" width="8" height="8"/>
                        <rect x="120" y="160" width="8" height="8"/>
                        <rect x="144" y="160" width="8" height="8"/>
                        <rect x="168" y="160" width="8" height="8"/>
                        
                        <rect x="88" y="176" width="8" height="8"/>
                        <rect x="104" y="176" width="8" height="8"/>
                        <rect x="128" y="176" width="8" height="8"/>
                        <rect x="152" y="176" width="8" height="8"/>
                        
                        <rect x="80" y="192" width="8" height="8"/>
                        <rect x="112" y="192" width="8" height="8"/>
                        <rect x="136" y="192" width="8" height="8"/>
                        <rect x="160" y="192" width="8" height="8"/>
                        
                        <rect x="96" y="208" width="8" height="8"/>
                        <rect x="120" y="208" width="8" height="8"/>
                        <rect x="144" y="208" width="8" height="8"/>
                        <rect x="168" y="208" width="8" height="8"/>
                        
                        <rect x="80" y="224" width="8" height="8"/>
                        <rect x="104" y="224" width="8" height="8"/>
                        <rect x="128" y="224" width="8" height="8"/>
                        <rect x="152" y="224" width="8" height="8"/> */}

                                {/* Additional modules */}
                                {/* <rect x="184" y="80" width="8" height="8"/>
                        <rect x="200" y="96" width="8" height="8"/>
                        <rect x="216" y="112" width="8" height="8"/>
                        <rect x="184" y="128" width="8" height="8"/>
                        <rect x="200" y="144" width="8" height="8"/>
                        <rect x="216" y="160" width="8" height="8"/>
                        <rect x="184" y="176" width="8" height="8"/>
                        <rect x="200" y="192" width="8" height="8"/>
                        <rect x="216" y="208" width="8" height="8"/>
                        <rect x="184" y="224" width="8" height="8"/> */}

                                {/* Alignment pattern */}
                                {/* <rect x="168" y="168" width="24" height="24"/>
                        <rect x="176" y="176" width="8" height="8" fill="white"/>
                      </g>
                    </svg>
                  </div>
                  <p className="text-muted-foreground mt-4 text-sm">
                    Scan to visit our website
                  </p>
                  <Button variant="accent" className="mt-4" asChild>
                    <a href="https://dawatsrls.com" target="_blank" rel="noopener noreferrer">
                      Visit Website
                    </a>
                  </Button>
                </motion.div> */}
                            </div>

                            {/* Right Column - Map */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="space-y-6"
                            >
                                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                                    Find Us
                                </h2>
                                <div className="rounded-xl overflow-hidden shadow-lg h-[400px] md:h-[500px] lg:h-[414px]">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2970.2893947888!2d12.5533!3d41.8947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f61b6532013ad%3A0x28f1c82e908503c4!2sPiazza%20dei%20Mirti%2C%2019%2C%2000172%20Roma%20RM%2C%20Italy!5e0!3m2!1sen!2sus!4v1699000000000!5m2!1sen!2sus"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Dawat Restaurant Location"
                                        className="grayscale hover:grayscale-0 transition-all duration-500"
                                    />
                                </div>
                                <div className="bg-secondary rounded-lg p-4">
                                    <p className="text-sm text-muted-foreground">
                                        <strong className="text-foreground">Address:</strong> Piazza dei Mirti 19, 00172 Roma RM, Italy
                                    </p>
                                    <p className="text-sm text-muted-foreground mt-2">
                                        <strong className="text-foreground">Delivery Area:</strong> Within 5 km radius of our restaurant location
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>

            {/* <Footer /> */}
        </div>
    );
};

export default Contact;
