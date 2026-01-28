import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingCart, Search, User, Phone } from "lucide-react";
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
} from "@/components/ui/dropdown-menu";
import { CartSheetContent } from "./CartSidebar";
import { AuthModal } from "./AuthModal";
import { getCookie, deleteCookie } from "@/utils/cookieUtils";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "Shop", href: "/shop" },
  { name: "About", href: "#about" },
  // { name: "Restaurants", href: "#restaurants" },
  { name: "Contact", href: "#contact" },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isCartOpen, openCart, closeCart, cartCount } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const token = getCookie("access_token");
    setIsLoggedIn(!!token);
  }, []);

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
          <div className="flex items-center justify-between h-42">
            {/* Logo */}
            {/* Logo */}
            <a href="/" className="flex items-center gap-2">
              <Image
                src="/logo_1.png"
                alt="Fooddy Logo"
                width={150}
                height={50}
                className="h-20 w-auto object-contain"
                priority
              />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
              <Search className="w-5 h-5" />
            </button> */}
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <button className="p-2 text-muted-foreground hover:text-primary transition-colors outline-none">
                    <User className="w-5 h-5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {!isLoggedIn ? (
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => setAuthModalOpen(true)}
                    >
                      Login
                    </DropdownMenuItem>
                  ) : (
                    <>
                      <DropdownMenuItem className="cursor-pointer">
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer text-red-500 focus:text-red-500"
                        onClick={() => {
                          deleteCookie("access_token");
                          deleteCookie("refresh_token");
                          window.location.reload();
                        }}
                      >
                        Logout
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

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
                <SheetContent side="left" className="w-full sm:w-[400px] border-none shadow-none bg-black/50 flex flex-col backdrop-blur-[2px]">
                  <SheetHeader className="px-1">
                    <SheetTitle className="text-left text-white">Shopping Cart</SheetTitle>
                  </SheetHeader>
                  <CartSheetContent onAuthRequired={() => setAuthModalOpen(true)} />
                </SheetContent>
              </Sheet>

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
