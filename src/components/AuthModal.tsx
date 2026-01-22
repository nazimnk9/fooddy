"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogClose, DialogPortal } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Lock, User, X, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthModalProps {
    children: React.ReactNode;
}

export function AuthModal({ children }: AuthModalProps) {
    const [activeTab, setActiveTab] = useState<"login" | "register">("login");
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [showRegisterPassword, setShowRegisterPassword] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen} modal={false}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            {isOpen && (
                <DialogPortal>
                    <div
                        className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
                        onClick={() => setIsOpen(false)}
                    />
                </DialogPortal>
            )}
            <DialogContent className="p-0 gap-0 max-w-[400px] border-none bg-transparent shadow-none [&>button]:hidden sm:rounded-lg overflow-hidden">
                {/* Modal Container */}
                <div className="bg-white rounded-lg overflow-hidden w-full flex flex-col">
                    {/* Header & Tabs */}
                    <div className="flex items-stretch h-12">
                        {/* Login Tab */}
                        <button
                            onClick={() => setActiveTab("login")}
                            className={cn(
                                "flex-1 flex items-center justify-center gap-2 text-sm font-semibold transition-colors",
                                activeTab === "login"
                                    ? "bg-white text-primary"
                                    : "bg-gray-100 text-gray-400 hover:bg-gray-50"
                            )}
                        >
                            <Lock className="w-4 h-4" />
                            LOGIN
                        </button>

                        {/* Register Tab */}
                        <button
                            onClick={() => setActiveTab("register")}
                            className={cn(
                                "flex-1 flex items-center justify-center gap-2 text-sm font-semibold transition-colors",
                                activeTab === "register"
                                    ? "bg-white text-primary"
                                    : "bg-gray-100 text-gray-400 hover:bg-gray-50"
                            )}
                        >
                            <User className="w-4 h-4" />
                            REGISTER
                        </button>

                        {/* Close Button */}
                        <DialogClose className="w-12 bg-[#FF8C69] hover:bg-[#FF8C69]/90 flex items-center justify-center text-white transition-colors">
                            <X className="w-5 h-5" />
                        </DialogClose>
                    </div>

                    {/* Content Area */}
                    <div className="p-6">
                        {activeTab === "login" ? (
                            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                <div className="space-y-4">
                                    <div className="relative">
                                        <Input
                                            type="text"
                                            placeholder="Login *"
                                            className="rounded-full px-4 py-6 border-gray-200 focus-visible:ring-primary/20 bg-white"
                                            required
                                        />
                                    </div>
                                    <div className="relative">
                                        <Input
                                            type={showLoginPassword ? "text" : "password"}
                                            placeholder="Password *"
                                            className="rounded-full px-4 py-6 border-gray-200 focus-visible:ring-primary/20 bg-white pr-10"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowLoginPassword(!showLoginPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                        >
                                            {showLoginPassword ? (
                                                <EyeOff className="w-4 h-4" />
                                            ) : (
                                                <Eye className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-sm py-2">
                                    <a href="#" className="text-primary hover:underline font-medium">
                                        Forgot password?
                                    </a>
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <Checkbox id="remember" className="rounded-sm border-gray-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                                        <label htmlFor="remember" className="cursor-pointer select-none">
                                            Remember me
                                        </label>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-auto min-w-[120px] rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-base py-6"
                                >
                                    Login
                                </Button>
                            </form>
                        ) : (
                            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid gap-3">
                                    <div className="grid grid-cols-2 gap-3">
                                        <Input
                                            name="first_name"
                                            placeholder="First Name"
                                            className="rounded-full px-4 py-5 border-gray-200 focus-visible:ring-primary/20"
                                            required
                                        />
                                        <Input
                                            name="last_name"
                                            placeholder="Last Name"
                                            className="rounded-full px-4 py-5 border-gray-200 focus-visible:ring-primary/20"
                                            required
                                        />
                                    </div>
                                    <Input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        className="rounded-full px-4 py-5 border-gray-200 focus-visible:ring-primary/20"
                                        required
                                    />
                                    <Input
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone"
                                        className="rounded-full px-4 py-5 border-gray-200 focus-visible:ring-primary/20"
                                        required
                                    />
                                    <div className="relative">
                                        <Input
                                            type={showRegisterPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="Password"
                                            className="rounded-full px-4 py-5 border-gray-200 focus-visible:ring-primary/20 pr-10"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                        >
                                            {showRegisterPassword ? (
                                                <EyeOff className="w-4 h-4" />
                                            ) : (
                                                <Eye className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-auto min-w-[120px] rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-base py-6 mt-2"
                                >
                                    Register
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
