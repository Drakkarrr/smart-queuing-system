"use client";

import { useEffect } from "react";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import BgWaves from "@/assets/bg-waves.png";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.clear();
    }, 800);

    return () => {
      clearTimeout(timer);
    };
  }, [router]);

  return (
    <div className="grid w-full h-full place-items-center">
      <Image src={Logo} width={200} height={200} alt="Moelci-II logo" />
      <div className="text-center">
        <h1 className="p-6 text-3xl font-extrabold text-[#E80203] font-heading sm:text-5xl md:text-6xl lg:text-7xl">
          WELCOME TO MOELCI-II
        </h1>
        <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl md:text-6xl">
          Bonifacio Branch
        </h2>
        <div className="pt-8">
          <Link
            href="/purpose"
            className={`btn-custom text-xl rounded-none  text-black tracking-wide font-extrabold hover:bg-yellow-300 hover:pb-2 ${cn(
              buttonVariants({ size: "lg" }),
            )}`}
          >
            Proceed
          </Link>
        </div>
      </div>

      <div className="relative w-full h-60">
        <Image
          src={BgWaves}
          layout="fill"
          objectPosition="bottom"
          alt="Moelci-II waves"
        />
      </div>
    </div>
  );
}
