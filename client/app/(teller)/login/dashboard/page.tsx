"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import BgWaves from "@/assets/bg-waves.png";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import useRequest from "@/hooks/useRequest";
import { getServing, getNext } from '@/app/api/api';

type CurrentNumberServing = {
  currentNumberServing: number;
};

type VisitPurpose = "Payment" | "Concern";

export default function AdminDashboardPage() {
  const request = useRequest();
  const [currentNumberServing, setCurrentNumberServing] = useState<
    CurrentNumberServing | any
  >();
  const [visitPurpose, setVisitPurpose] = useState<VisitPurpose>("Payment");
  const [accountNumber, setAccountNumber] = useState("");
  const [waitingTime, setWaitingTime] = useState("");

  const handleNextClick = async () => {
    // const res = await request.get('queue/serving');

    // if (res.ok) {
    //   const data = await res.json();

    //   setCurrentNumberServing(data.priority_number);
    //   setVisitPurpose(data.que_type);

    //   // setCurrentNumberServing(() => {
    //   //   const currentNumberServing = Math.floor(Math.random() * 1000) + 1;
    //   //   return currentNumberServing;
    //   // });

    //   // setVisitPurpose(() => {
    //   //   const visitPurpose = Math.floor(Math.random() * 2) + 1;
    //   //   return visitPurpose === 1 ? "Payment" : "Concern";
    //   // });
    // }

    const token = localStorage.getItem('access_token');
    const res = await getNext(token);

    if(res.status == 200){
      updateServing()
    }
  };

  const updateServing = async () => {
    const serving = await getServing();
    if(serving.status == 200 && !(Object.keys(serving.data).length === 0)){
      setCurrentNumberServing(serving.data['priority_number']);
      setVisitPurpose(serving.data['que_type']);
      setAccountNumber(serving.data['account_number']);
      // setWaitingTime(serving.data['account_number']);
    }

  }

  useEffect(() => {
    updateServing();
  }, []);

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
          <h2 className="text-4xl font-bold text-[#000000] leading-[1.1]">
            Current Number Serving
          </h2>
          <h3 className="font-heading md:text-6xl font-bold text-[#E80203] leading-[1.1]">
            {currentNumberServing}
          </h3>

          <div className="grid my-6 text-lg font-bold place-items-center">
            <p>Purpose of Visit: {visitPurpose}</p>
            {/* <p>Account Number: 123456789</p> */}
            {accountNumber && <p>Account Number: {accountNumber}</p>}
            {/* <p>You are expected to be serve at 10:15am</p> */}
          </div>

          <div className="flex flex-col items-center pt-10 space-y-10">
            <Link
              onClick={handleNextClick}
              href="#"
              className={`btn-custom rounded-full text-xl tracking-wide font-extrabold hover:bg-yellow-300 hover:pb-1 text-black ${cn(
                buttonVariants({ size: "lg" }),
              )}`}
            >
              Next
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


