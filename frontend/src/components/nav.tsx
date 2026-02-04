import React from "react";
import {useAuth} from "../auth/useAuth";

export default function Navigation() {
  const { isAuthenticated } = useAuth();
  const navItems: { label: string; href: string }[] = isAuthenticated
    ? [
        { label: "Home", href: "/" },
        { label: "Analyze", href: "/analyze" },
        { label: "Profile", href: "/me" },
        { label: "About Us", href: "#" },
      ]
    : [
        { label: "Home", href: "/" },
        { label: "About Us", href: "#" },
        { label: "Login", href: "/login" },
        { label: "Register", href: "/register" },
      ];

return (
    <nav className="w-full bg-blue-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Resume Analyzer</h1>

            <ul className="flex gap-6 text-lg">
                {navItems.map((item) => (
                    <li key={item.label}>
                        <a
                            href={item.href}
                            className="hover:text-blue-200 transition-colors"
                        >
                            {item.label}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    </nav>
);
}