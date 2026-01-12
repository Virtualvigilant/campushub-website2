import { Link, useLocation } from "wouter";
// import { Button } from "./components/ui/button";
import { Button } from "./ui/button";

import { Home, Search, Building2, User, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/listings", label: "Browse Rooms", icon: Search },
    { href: "/landlord", label: "For Landlords", icon: Building2 },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <Home className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground" data-testid="logo-text">
              Campus<span className="text-primary">Hub</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant={location === link.href ? "secondary" : "ghost"}
                  className="gap-2"
                  data-testid={`nav-${link.label.toLowerCase().replace(" ", "-")}`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/signin">
              <Button variant="ghost" data-testid="button-login">
                Log In
              </Button>
            </Link>
            <Link href="/signup">
              <Button data-testid="button-signup">
                Sign Up
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-lg">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant={location === link.href ? "secondary" : "ghost"}
                  className="w-full justify-start gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Button>
              </Link>
            ))}
            <div className="pt-4 border-t border-border/50 space-y-2">
              <Link href="/signin">
                <Button variant="outline" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                  Log In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="w-full" onClick={() => setMobileMenuOpen(false)}>
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
