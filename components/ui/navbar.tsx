"use client";
import { Equal, Github, X } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/liquid-glass-button";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Questions", href: "/questions" },
  { name: "Employées", href: "/questions/employees/1" },
  { name: "Administrateurs", href: "/questions/administrators/1" },
];

export function Header() {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header>
      <nav
        data-state={menuState && "active"}
        className="fixed left-0 w-full z-20 px-2"
      >
        <div className={cn("mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12", isScrolled && "bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5")}>
          <div className="relative flex flex-wrap items-center justify-between gap-6 lg:gap-0 py-2">
            <div className="flex w-full justify-between lg:w-auto">
              <Link
                href="/"
                aria-label="home"
                className="flex gap-2 items-center"
              >
                <img
                  src="/shield-icon.svg"
                  alt="Shield"
                  width={24}
                  height={24}
                  className="size-6"
                />
                <p className="font-semibold text-xl tracking-tighter"> Questionnaire sécurité</p>
              </Link>

              <button
                type="button"
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState === true ? "Close Menu" : "Open Menu"}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Equal className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>
            </div>

            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm">
                {menuItems.map((item, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-accent-foreground block duration-150"
                    >
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="text-muted-foreground hover:text-accent-foreground block duration-150"
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-2 sm:space-y-0 md:w-fit">

                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className={cn(isScrolled && "lg:hidden")}
                >
                  <Link href="https://github.com/gxuvain/it-project-2025">
                    <Github />
                    <span>GitHub</span>
                  </Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className={cn(isScrolled ? "lg:inline-flex" : "hidden")}
                >
                  <Link href="https://github.com/gxuvain/it-project-2025">
                    <Github />
                    <span>GitHub</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
