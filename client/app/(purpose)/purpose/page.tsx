import Image from "next/image";
import Logo from "@/assets/logo.png";
import BgWaves from "@/assets/bg-waves.png";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function PurposePage() {
  return (
    <div className="grid w-full h-full place-items-center">
      <div className="relative w-full h-60">
        <Image
          src={BgWaves}
          layout="fill"
          objectPosition="bottom"
          alt="Moelci-II waves"
          className="rotate-180"
        />
      </div>
      <div className="grid w-10/12 p-8 space-y-10 ring ring-black ring-offset-2 ring-offset-slate-50 dark:ring-offset-slate-900 place-items-center">
        <Image
          src={Logo}
          width={200}
          height={200}
          alt="Moelci-II logo"
          className="absolute top-32"
        />
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold text-[#E80203] leading-[1.1] sm:text-3xl md:text-6xl">
            Choose your purpose of visit
          </h2>
          <div className="flex flex-col items-center space-y-10 pt-14">
            <Link
              href="/purpose/concern"
              className={`btn-custom text-xl rounded-none tracking-wide font-extrabold hover:bg-yellow-300 hover:pb-1 text-black ${cn(
                buttonVariants({ size: "lg" }),
              )}`}
            >
              Concern
            </Link>
            <Link
              href="/purpose/payment"
              className={`btn-custom rounded-none text-xl tracking-wide font-extrabold hover:bg-yellow-300 hover:pb-1 text-black ${cn(
                buttonVariants({ size: "lg" }),
              )}`}
            >
              Payment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
