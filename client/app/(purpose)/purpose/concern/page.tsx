'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Logo from '@/assets/logo.png';
import BgWaves from '@/assets/bg-waves.png';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useCallback, useEffect } from 'react'; // Import useEffect
import useRequest from '@/hooks/useRequest';
import React, { useState } from 'react'; // Remove the import for useEffect (already imported)

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
  const logoSrc = Logo.src;

  useEffect(() => {
    // Add the iframe dynamically when the component mounts
    const iframe = document.createElement('iframe');
    iframe.id = 'print_frame';
    iframe.name = 'print_frame';
    iframe.width = '0';
    iframe.height = '0';
    iframe.frameBorder = '0';
    iframe.src = 'about:blank';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    return () => {
      // Remove the iframe when the component unmounts
      document.body.removeChild(iframe);
    };
  }, []); // The empty dependency array ensures this effect runs only once when the component mounts

  // ...

  const handlePrintQueue = async () => {
    try {
      const res = await getQueue({
        que_type: 'concern',
      });

      if (res.status === 200) {
        console.log('TICKET RESPONSE: ', res.data);

        // Prepare the content for printing with updated styles and logo
        const printContent = `
        <style>
          body { margin: 0; padding: 0; text-align: center; }
          h1 { font-size: 2em; color: red; }
          div { margin: 10px; }
          img, svg { max-width: 100%; height: auto; }
        </style>
        <svg viewBox="0 0 24 24" width="70px" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 14.7519C3.37037 13.8768 3 12.8059 3 11.6493C3 9.20008 4.8 6.9375 7.5 6.5C8.34694 4.48637 10.3514 3 12.6893 3C15.684 3 18.1317 5.32251 18.3 8.25C19.8893 8.94488 21 10.6503 21 12.4969C21 13.5693 20.6254 14.5541 20 15.3275M12.5 12.9995L10.5 21.0008M8.5 11.9995L6.5 20.0008M16.5 12L14.5 20.0013" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        <div>Type Of Transaction: ${res.data['queue_item']['que_type']}</div>
        <h1>${res.data['queue_item']['priority_number']}</h1>
        <div>Estimated Waiting Time: ${res.data['estimated_waiting_time']} minutes</div>
      `;

        // Create a new HTML document for printing
        const printDocument =
          document.implementation.createHTMLDocument('Print Document');
        printDocument.body.innerHTML = printContent;

        // Print the content
        window.frames['print_frame' as any].document.body.innerHTML =
          printDocument.body.innerHTML;
        window.frames['print_frame' as any].window.focus();
        window.frames['print_frame' as any].window.print();

        // Redirect to the "/thankyou" page
        router.push('/thankyou');
      }
    } catch (error) {
      console.error('Error fetching/printing queue data:', error);
    }
  };

  // ...

  return (
    <div className='grid w-full h-full place-items-center'>
      <div className='relative w-full h-60'>
        <Image
          src={BgWaves}
          layout='fill'
          objectPosition='bottom'
          alt='Moelci-II waves'
          className='rotate-180'
        />
      </div>
      <div className='grid w-10/12 p-8 space-y-10 ring ring-black ring-offset-2 ring-offset-slate-50 dark:ring-offset-slate-900 place-items-center'>
        <Image
          src={Logo}
          width={200}
          height={200}
          alt='Moelci-II logo'
          className='absolute top-32'
        />
        <div className='w-full space-y-32 text-center'>
          <h2 className='font-heading text-3xl font-bold bg-[#F9D029] w-96 py-4 m-auto rounded-3xl leading-[1.1] sm:text-3xl md:text-6xl'>
            Concern
          </h2>
          <div className='flex justify-around w-full'>
            <Link
              href='#'
              onClick={() => router.back()}
              className={`rounded-none text-xl tracking-wide font-bold bg-black hover:pb-2 text-white ${cn(
                buttonVariants({ size: 'lg' })
              )}`}>
              &larr; Back
            </Link>
            <Link
              href='#'
              onClick={handlePrintQueue}
              className={`rounded-none text-xl tracking-wide font-bold hover:pb-2 text-white ${cn(
                buttonVariants({ size: 'lg', variant: 'destructive' })
              )}`}>
              Print Q. number
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
