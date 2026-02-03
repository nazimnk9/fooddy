"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, LogIn, LogOut, Menu, X, ShoppingCart, Search, User, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { CartSheetContent } from "./CartSidebar";
import { AuthModal } from "./AuthModal";
import { getCookie, deleteCookie } from "@/utils/cookieUtils";
import { useCart } from "@/context/CartContext";
import { getUserProfile } from "@/services/authService";

import Link from "next/link";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setProfile } from "@/redux/features/auth/authSlice";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Menu Items", href: "/menu" },
  // { name: "Shop", href: "/shop" },
  { name: "About Us", href: "/about" },
  // { name: "Restaurants", href: "#restaurants" },
  { name: "Contact", href: "/contact" },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isCartOpen, openCart, closeCart, cartCount } = useCart();
  const { isLoggedIn, userProfile } = useAppSelector((state) => state.auth);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = getCookie("access_token");
      if (!token) return;
      try {
        const profile = await getUserProfile(token);
        dispatch(setProfile(profile));
      } catch (error) {
        console.error("Error fetching initial profile:", error);
      }
    };
    fetchProfile();
  }, [dispatch]);

  return (
    <>
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/90 backdrop-blur-[2px]"
            onClick={closeCart}
          />
        )}
      </AnimatePresence>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        {/* Top Header - Home Page Only */}
        {/* {isHomePage && ( */}
        {/* <div className="bg-primary py-2 px-4 hidden md:block">
          <div className="container-fooddy flex justify-between items-center text-primary-foreground">
            <div className="flex items-center gap-2 text-sm font-medium">
              <span className="opacity-80">Call us for Ordering</span>
              <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
                <Phone className="w-3 h-3" />
                <span>344 4335555</span>
              </div>
            </div>
            <div>
              {!isLoggedIn && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary-foreground hover:bg-white/20 h-auto py-1 px-4 text-sm"
                  onClick={() => setAuthModalOpen(true)}
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        </div> */}
        {/* )} */}

        <div className="container-fooddy py-2">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo_1.png"
                alt="Fooddy Logo"
                width={150}
                height={50}
                className="h-20 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
              <Search className="w-5 h-5" />
            </button> */}
              <Sheet modal={false} open={isCartOpen} onOpenChange={isCartOpen ? closeCart : openCart}>
                <SheetTrigger asChild>
                  <button
                    onClick={openCart}
                    className="relative p-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-semibold">
                      {cartCount}
                    </span>
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full sm:w-[400px] border-none shadow-xl bg-white flex flex-col">
                  <SheetHeader className="px-1 border-b pb-4 mb-4">
                    <SheetTitle className="text-left text-foreground font-bold text-2xl">Shopping Cart</SheetTitle>
                  </SheetHeader>
                  <CartSheetContent onAuthRequired={() => setAuthModalOpen(true)} />
                </SheetContent>
              </Sheet>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <button className="p-2 text-muted-foreground hover:text-primary transition-colors outline-none flex flex-col items-center gap-1">
                    <User className="w-5 h-5" />
                    <span className="text-xs font-medium">{isLoggedIn && userProfile ? userProfile.first_name + " " + userProfile.last_name : "Profile"}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[240px] p-0 rounded-2xl overflow-hidden border-none shadow-[0_2px_20px_rgba(0,0,0,0.15)]">
                  <div className="p-4 flex flex-col gap-4">
                    <h3 className="font-bold text-[#1a2b4b] text-xl px-2">{isLoggedIn && userProfile ? userProfile.first_name + " " + userProfile.last_name : "Profile"}</h3>

                    <DropdownMenuItem className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer focus:bg-transparent hover:text-primary transition-colors hover:bg-accent/10 focus:bg-accent/10">
                      <HelpCircle className="w-6 h-6 text-[#1a2b4b]" />
                      <span className="text-[#1a2b4b] font-medium text-base">Support</span>
                    </DropdownMenuItem>
                  </div>

                  {!isLoggedIn ? (
                    <div className="bg-[#f4f7fa] p-2">
                      <DropdownMenuItem
                        className="flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl hover:bg-accent/10 focus:bg-accent/10"
                        onClick={() => setAuthModalOpen(true)}
                      >
                        <LogIn className="w-6 h-6 text-[#1a2b4b]" />
                        <span className="text-[#1a2b4b] font-bold text-base">Log in or sign up</span>
                      </DropdownMenuItem>
                    </div>
                  ) : (
                    <div className="bg-[#f4f7fa] p-2 flex flex-col gap-1">
                      <Link href="/profile">
                        <DropdownMenuItem className="flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl hover:bg-accent/10 focus:bg-accent/10">
                          <User className="w-6 h-6 text-[#1a2b4b]" />
                          <span className="text-[#1a2b4b] font-bold text-base">Profile</span>
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem
                        className="flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl hover:bg-accent/10 focus:bg-accent/10 text-red-500 focus:text-red-500"
                        onClick={() => {
                          deleteCookie("access_token");
                          deleteCookie("refresh_token");
                          window.location.reload();
                        }}
                      >
                        <LogOut className="w-6 h-6" />
                        <span className="font-bold text-base">Logout</span>
                      </DropdownMenuItem>
                    </div>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 text-foreground"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isOpen && (
              <motion.nav
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden overflow-hidden"
              >
                <div className="py-4 space-y-2">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="block py-2 text-foreground hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
};
