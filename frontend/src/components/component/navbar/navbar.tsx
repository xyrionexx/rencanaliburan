"use client";

import Image from "next/image";
import logoDarkMode from "@/assets/logoDarkMode.png";
import logoLightMode from "@/assets/logoLightMode.png";
import { usePathname } from "next/navigation";
import Link from "next/link";
import * as React from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import userImage from "@/assets/user.jpg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useSession, signIn, signOut } from "next-auth/react";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="h-9 w-9">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function UserModeToggle() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="h-9 w-9">
          <Image
            src={userImage}
            alt="User"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Light</DropdownMenuItem>
        <DropdownMenuItem>Dark</DropdownMenuItem>
        <DropdownMenuItem>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <nav
        className={`flex justify-between w-full h-16 items-center px-5 sm:px-8 lg:px-14 fixed z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#F5EFE6]/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="logo flex items-center justify-center gap-2">
          <Image
            src={logoLightMode}
            alt="Logo"
            width={90}
            height={90}
            className="dark:block hidden w-16 sm:w-20 lg:w-[90px]"
          />
          <Image
            src={logoDarkMode}
            alt="Logo"
            width={90}
            height={90}
            className="dark:hidden block w-16 sm:w-20 lg:w-[90px]"
          />

          <h1 className="font-bold text-base sm:text-lg lg:text-xl">
            LumoTrip
          </h1>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex gap-5 ml-5 text-[13.5px]">
            <li>
              <Link
                href="/"
                className={`hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                  isActive("/")
                    ? "text-blue-600 dark:text-blue-400 font-semibold"
                    : ""
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/destinations"
                className={`hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                  isActive("/destinations")
                    ? "text-blue-600 dark:text-blue-400 font-semibold"
                    : ""
                }`}
              >
                Destinations
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                  isActive("/about")
                    ? "text-blue-600 dark:text-blue-400 font-semibold"
                    : ""
                }`}
              >
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex gap-2 items-center">
          <div className="buttonLogin border border-black dark:border-white w-[100px] flex justify-center p-1 rounded-4xl hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
            {status === "loading" ? (
              <span className="text-xs sm:text-sm">Loading...</span>
            ) : !session ? (
              <Link href="/login">
                <button className="text-xs sm:text-sm">Sign In</button>
              </Link>
            ) : (
              <button className="text-xs sm:text-sm" onClick={() => signOut()}>
                Hi, {session.user?.name}
              </button>
            )}
          </div>
          <div>
            <ModeToggle />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden gap-2 items-center">
          <ModeToggle />
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg">
            <div className="flex flex-col p-5 gap-4">
              {/* Mobile Navigation Links */}
              <ul className="flex flex-col gap-4 text-base">
                <li>
                  <Link
                    href="/"
                    className={`block py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                      isActive("/")
                        ? "text-blue-600 dark:text-blue-400 font-semibold"
                        : ""
                    }`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/destinations"
                    className={`block py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                      isActive("/destinations")
                        ? "text-blue-600 dark:text-blue-400 font-semibold"
                        : ""
                    }`}
                  >
                    Destinations
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className={`block py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                      isActive("/about")
                        ? "text-blue-600 dark:text-blue-400 font-semibold"
                        : ""
                    }`}
                  >
                    About
                  </Link>
                </li>
              </ul>

              {/* Mobile Actions */}
              <div className="flex flex-col gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="buttonLanguage flex border border-black dark:border-white relative rounded-4xl w-full max-w-[200px] h-10">
                  <button className="rounded-4xl hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black p-1 h-full w-[55%] active:bg-black active:text-white absolute top-0 left-0 transition-colors">
                    EN
                  </button>
                  <button className="rounded-4xl hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black p-1 h-full w-[55%] absolute top-0 right-0 transition-colors">
                    ID
                  </button>
                </div>
                <Link href="/login" className="w-full max-w-[200px]">
                  <button className="w-full border border-black dark:border-white p-2 rounded-4xl hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
                    Sign In
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
