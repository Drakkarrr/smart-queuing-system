"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import ThanksEmoji from "@/assets/thanksEmoji.png";
import BgWaves from "@/assets/bg-waves.png";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ThankYouPage() {
  const router = useRouter();
  const storedAccountNumber = localStorage.getItem("accountNumber");

  if (storedAccountNumber !== null) {
    localStorage.setItem("AccountNumber", storedAccountNumber);
    console.log("AccountNumber", storedAccountNumber);
  } else {
    console.log("Account Number not found in local storage");
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [router]);

  return (
    <div className="grid w-full h-full place-items-center">
      <Image src={Logo} width={200} height={200} alt="Moelci-II logo" />
      <div className="text-center">
        <h1 className="p-4 text-3xl font-extrabold text-[#E80203] font-heading sm:text-5xl md:text-6xl lg:text-7xl">
          Thank You!
        </h1>
        <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl md:text-6xl">
          Have a great day!
        </h2>
        <div className="pt-2">
          <Image
            src={ThanksEmoji}
            className="m-auto"
            width={180}
            height={180}
            alt="Emoticon logo"
          />
        </div>
      </div>
      <div className="relative w-full h-52">
        <Image
          src={BgWaves}
          layout="fill"
          objectPosition="bottom"
          alt="Moelci-II waves"
          // className='rotate-180'
        />
      </div>
    </div>
  );
}
