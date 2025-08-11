"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, MessageSquare, History } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

export default function BottomNav() {
  const pathname = usePathname();
  const { user } = useAuth();

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/status", icon: History, label: "Status" },
    { href: "/chat", icon: MessageSquare, label: "Chat" },
    { href: user ? `/profile/${user.uid}` : "/login", icon: User, label: "Profile" },
  ];

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t z-50">
      <div className="flex justify-around h-16">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center w-full text-sm font-medium transition-colors",
              pathname === item.href ? "text-primary" : "text-muted-foreground hover:text-primary"
            )}
          >
            <item.icon className="h-6 w-6 mb-1" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
