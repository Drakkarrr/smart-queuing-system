"use client";

import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import BgWaves from "@/assets/bg-waves.png";
import { Button, buttonVariants } from "@/components/ui/button";
import { AccountInput } from "@/components/account-input";
import Link from "next/link";
import { cn } from "@/lib/utils";
import useRequest from "@/hooks/useRequest";
import { getQueue } from '@/app/api/api';


export default function PaymentPage() {
  const request = useRequest();
  const router = useRouter();
  const [isInputValid, setInputValid] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");

  const handleInputValidChange = (valid: boolean) => {
    setInputValid(valid);
  };

  const handleAccountNumberChange = (accountNumber: string | any) => {
    setAccountNumber(accountNumber);
  };

  const handleEnterClick = useCallback(async () => {
    // const res = await request.post('get_que', {
    //   account_number: accountNumber,
    //   que_type: 'payment',
    // });
    const res = await getQueue({
      account_number: accountNumber,
      que_type: 'payment',
    });

    if (res.status == 200) {
      console.log('TICKET RESPONSE: ', res.data);

      // Create a new window for printing
      const printWindow = window.open('', '_blank');
      printWindow!.document.write(`<html><head><title>Print Q. number</title></head><body>`);
      printWindow!.document.write(`<div>Type Of Transaction: ${res.data['queue_item']['que_type']}</div>`); // Customize with your actual queue number
      printWindow!.document.write(`<div>Account number: ${res.data['queue_item']['account_number']}</div>`); // Customize with your actual queue number
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

    if (isInputValid) {
      localStorage.setItem("AccountNumber", accountNumber);
      router.push("/thankyou");
    }
  }, [accountNumber]);

  return (
    <>
      <div className="grid w-full h-full place-items-center">
        <div className="relative w-full h-52">
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
            className="absolute top-24"
          />
          <div className="w-full text-center space-y-14">
            <h2 className="font-heading text-3xl font-bold bg-[#F9D029] w-96 py-4 m-auto rounded-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Payment
            </h2>
            <div>
              <AccountInput 
                onInputValidChange={handleInputValidChange}
                onInputChange={handleAccountNumberChange}
              />
            </div>
            <div className="flex justify-around w-full">
              <Link
                href="#"
                onClick={() => router.back()}
                className={`rounded-none text-xl tracking-wide font-bold bg-black hover:pb-1 text-white ${cn(
                  buttonVariants({ size: "lg" }),
                )}`}
              >
                &larr; Back
              </Link>
              <Button
                onClick={handleEnterClick}
                className={`${
                  isInputValid
                    ? `${cn(
                        buttonVariants({ size: "lg", variant: "destructive" }),
                      )} rounded-none bd-none text-xl hover:pb-3 tracking-wide font-bold text-white`
                    : `${buttonVariants({
                        size: "lg",
                      })} rounded-none text-xl tracking-wide font-bold bg-black text-white cursor-not-allowed bd-none`
                }`}
                disabled={!isInputValid}
              >
                Enter
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
