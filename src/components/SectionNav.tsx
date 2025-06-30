"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Circle, CheckCircle } from "lucide-react";

const sections = [
  { id: "home", name: "Accueil", icon: Circle },
  { id: "problem", name: "Problème", icon: Circle },
  { id: "solution", name: "Solution", icon: Circle },
  { id: "services", name: "Services", icon: Circle },
  { id: "testimonials", name: "Témoignages", icon: Circle },
  { id: "faq", name: "FAQ", icon: Circle },
];

export default function SectionNav() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      let current = "home";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute("id") || "home";
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
      <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg border border-gray-200">
        <div className="flex flex-col space-y-2">
          {sections.map((section, index) => {
            const isActive = activeSection === section.id;
            const isCompleted = sections.findIndex(s => s.id === activeSection) > index;
            
            return (
              <Button
                key={section.id}
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection(section.id)}
                className={`w-10 h-10 p-0 rounded-full transition-all duration-300 ${
                  isActive 
                    ? "bg-blue-600 text-white shadow-md" 
                    : isCompleted
                    ? "bg-green-100 text-green-600 hover:bg-green-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                title={section.name}
              >
                {isCompleted ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <section.icon className="h-4 w-4" />
                )}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
} 