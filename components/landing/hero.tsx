import Image from "next/image";
import React from "react";
import dashboard from "@/assets/dashboard.png";
import dashboard_dark from "@/assets/dashboard-dark.png";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import ThemeImage from "./theme-image";

const Hero = () => {
  return (
    <div className="min-h-screen pt-36 pb-24 mx-auto max-w-5xl flex flex-col items-center text-center">
      <h1 className="text-6xl font-bold">
        Unlock the Power of Concise Communication with{" "}
        <span className="text-blue-600 font-extrabold">Shortie</span>!
      </h1>
      <p className="text-xl text-muted-foreground mt-6">
        Our user-friendly link shortening application provides a quick and
        efficient way to condense long URLs into concise, shareable links.
      </p>
      <div className="space-x-2 mt-4">
        <Button variant="outline">See more</Button>
        <Button>Sign up</Button>
      </div>
      <div className="border-8 border-foreground dark:border-black rounded-xl overflow-hidden shadow-2xl mt-16 hover:scale-105 transition">
        <Image
          alt="Dashboard screen"
          src={dashboard}
          className="block dark:hidden"
        />
        <Image
          alt="Dashboard screen"
          src={dashboard_dark}
          className="hidden dark:block"
        />
      </div>

      {/* BACKGROUND DECORATION */}
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        ></div>
      </div>
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Hero;
