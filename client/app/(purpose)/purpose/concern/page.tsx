"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Logo from "@/assets/logo.png";
import BgWaves from "@/assets/bg-waves.png";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useCallback } from "react";
import useRequest from "@/hooks/useRequest";
import React, { useState, useEffect } from 'react';
import { getQueue } from '@/app/api/api';

export default function ConcernPage() {
  const request = useRequest();
  const router = useRouter();
  const [currentQueue, setCurrentQueue] = useState([]);

  // Function to fetch and update the current queue
  const updateQueue = async () => {
    try {
      const response = await getQueue();
      setCurrentQueue(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePrintQueue = async () => {
    const res = await getQueue({
      que_type: 'concern'
    });

    if (res.status == 200) {
      console.log('TICKET RESPONSE: ', res.data);

      // Create a new window for printing
      const printWindow = window.open('', '_blank');
      printWindow!.document.write(`<html><head><title>Print Q. number</title></head><body>`);
      printWindow!.document.write(`<div>Type Of Transaction: ${res.data['queue_item']['que_type']}</div>`); // Customize with your actual queue number
      printWindow!.document.write(`<h1>${res.data['queue_item']['priority_number']}</h1>`); // Customize with your actual queue number
      printWindow!.document.write(`<div>Estimated Time: ${res.data['estimated_waiting_time']}</div>`); // Customize with your actual queue number
      printWindow!.document.write(`</body></html>`);
      printWindow!.document.close(); // Necessary for IE >= 10
      printWindow!.focus(); // Necessary for IE >= 10
      // Use onfocus event to close the window after printing
      printWindow!.onfocus = () => {
        setTimeout(() => {
          printWindow!.close();
        }, 100); // Use a delay to ensure the print dialog has closed
      };

      printWindow!.print();
      router.push("/thankyou");
    }
  };

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
        <div className="w-full space-y-32 text-center">
          <h2 className="font-heading text-3xl font-bold bg-[#F9D029] w-96 py-4 m-auto rounded-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Concern
          </h2>
          <div className="flex justify-around w-full">
            <Link
              href="#"
              onClick={() => router.back()}
              className={`rounded-none text-xl tracking-wide font-bold bg-black hover:pb-2 text-white ${cn(
                buttonVariants({ size: "lg" }),
              )}`}
            >
              &larr; Back
            </Link>
            <Link
              // href="/thankyou"
              href="#"
              onClick={handlePrintQueue}
              className={`rounded-none text-xl tracking-wide font-bold hover:pb-2 text-white ${cn(
                buttonVariants({ size: "lg", variant: "destructive" }),
              )}`}
            >
              Print Q. number
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
