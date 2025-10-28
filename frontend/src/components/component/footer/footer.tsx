import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Footer() {
  return (
    <>
      <footer className="w-full p-5 sm:p-8 lg:p-10 bg-[#E8DFCA] dark:bg-[#000000] shadow-2xl dark:shadow-white">
        <div className="flex flex-col lg:flex-row justify-between gap-8 sm:gap-12 lg:gap-20 xl:gap-32  mb-6 sm:mb-8">
          {/* Perkenalan Section */}
          <div className="perkenalan justify-start w-full lg:w-[40%] gap-4 sm:gap-5 flex flex-col">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              LumoTrip
            </h2>
            <p className="text-sm sm:text-base mb-2 sm:mb-3 text-justify">
              Every journey begins with a dream — we're here to turn your travel
              ideas into real experiences. Discover destinations, plan with
              ease, and create meaningful memories wherever your adventure takes
              you.
            </p>
            <div className="sosialMedia flex gap-3 sm:gap-4">
              <a
                href="#"
                className="hover:scale-110 transition-transform"
                aria-label="YouTube"
              >
                <Icon
                  icon="line-md:youtube"
                  width="35"
                  height="35"
                  className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 color-black dark:color-white"
                />
              </a>
              <a
                href="#"
                className="hover:scale-110 transition-transform"
                aria-label="Instagram"
              >
                <Icon
                  icon="line-md:instagram"
                  width="35"
                  height="35"
                  className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 color-black dark:color-white"
                />
              </a>
              <a
                href="#"
                className="hover:scale-110 transition-transform"
                aria-label="Twitter/X"
              >
                <Icon
                  icon="line-md:twitter-x"
                  width="35"
                  height="35"
                  className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 color-black dark:color-white"
                />
              </a>
              <a
                href="#"
                className="hover:scale-110 transition-transform"
                aria-label="Facebook"
              >
                <Icon
                  icon="line-md:facebook"
                  width="35"
                  height="35"
                  className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 color-black dark:color-white"
                />
              </a>
            </div>
          </div>

          {/* Website & Kontak Section */}
          <div className="websiteKontak flex flex-col sm:flex-row lg:flex-col gap-8 sm:gap-12 lg:gap-10 w-full sm:w-auto lg:w-[25%]">
            <div className="website flex flex-col gap-3 sm:gap-4 lg:gap-5 flex-1">
              <h2 className="text-2xl sm:text-2xl lg:text-3xl font-bold">
                Legal
              </h2>
              <div className="linkWebSekolah flex flex-col gap-2 text-sm sm:text-base">
                <p>
                  <a
                    href="/termsofuse"
                    className="hover:underline hover:text-gray-700 transition-colors color-black dark:color-white"
                  >
                    Terms of Use
                  </a>
                </p>
                <p>
                  <a
                    href="/privacyandpolicy"
                    className="hover:underline hover:text-gray-700 transition-colors color-black dark:color-white"
                  >
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
            <div className="kontak flex flex-col gap-3 sm:gap-4 lg:gap-5 flex-1">
              <h2 className="text-2xl sm:text-2xl lg:text-3xl font-bold">
                Kontak
              </h2>
              <div className="dataKontak flex flex-col gap-2 text-sm sm:text-base">
                <p>
                  <a
                    href="tel:+0895384238691"
                    className="hover:underline hover:text-gray-700 transition-colors break-all"
                  >
                    No HP: 0895384238691
                  </a>
                </p>
                <p>
                  <a
                    href="mailto:aditcareer12370@gmail.com"
                    className="hover:underline hover:text-gray-700 transition-colors break-all"
                  >
                    Email: aditcareer12370@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links & Alamat Section */}
          <div className="pembuatAlamat flex flex-col sm:flex-row lg:flex-col gap-8 sm:gap-12 lg:gap-10 w-full sm:w-auto lg:w-[25%]">
            <div className="pembuat flex flex-col gap-3 sm:gap-4 lg:gap-5 flex-1">
              <h2 className="text-2xl sm:text-2xl lg:text-3xl font-bold">
                Quick Links
              </h2>
              <div className="quickLinks flex flex-col gap-2 text-sm sm:text-base">
                <p>
                  <Link
                    href="/"
                    className="hover:underline hover:text-gray-700 transition-colors color-black dark:color-white"
                  >
                    Home
                  </Link>
                </p>
                <p>
                  <Link
                    href="/about"
                    className="hover:underline hover:text-gray-700 transition-colors color-black dark:color-white"
                  >
                    About
                  </Link>
                </p>
                <p>
                  <Link
                    href="/contact"
                    className="hover:underline hover:text-gray-700 transition-colors color-black dark:color-white "
                  >
                    Contact
                  </Link>
                </p>
              </div>
            </div>
            <div className="Alamat flex flex-col gap-3 sm:gap-4 lg:gap-5 flex-1">
              <h2 className="text-2xl sm:text-2xl lg:text-3xl font-bold">
                Alamat
              </h2>
              <p className="text-sm sm:text-base text-justify">
                Jl. Soekarno‑Hatta Km. 10, Jatisari, Kec. Buahbatu, Kota
                Bandung, Jawa Barat 40286 – Indonesia
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-black/20 pt-4 sm:pt-6">
          <p className=" text-center text-xs sm:text-sm">
            &copy; 2025 Lumotrip. All Rights Reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
