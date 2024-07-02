'use client';


//import MultiStepFormOne from '@/app/shared/multi-step/multi-step-1';
import { metaObject } from '@/config/site.config';


// get params from url

import { useSearchParams } from 'next/navigation';


import { use, useEffect, useState } from 'react';

import { useQRCode } from 'next-qrcode';

// ?storecode=2000001&memberid=creath.park@gmail.com

//export const metadata = {
//  ...metaObject('Payment'),
//};

export default function PaymentFormPage() {
  ///return <MultiStepFormOne />;


  const searchParams = useSearchParams();

  const storecode = searchParams.get('storecode') || '';
  const memberid = searchParams.get('memberid') || '';

  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {

    if (storecode && memberid) {

      const userid = memberid + '@' + storecode;

      console.log('userid: ' + userid);

      fetch('/api/cryptopay/user/create?userid=' + userid)
        .then((response) => response.json())
        .then((data : any) => {
          console.log(data);
          setWalletAddress(data.data);
        });
  
    }

  } , [storecode, memberid]);

  console.log('walletAddress: ' + walletAddress);


  const { Canvas } = useQRCode();


  return (
    <div className=" w-96 min-h-screen bg-gradient-to-r from-[#136A8A] to-[#267871]
      flex flex-col items-center justify-start gap-3 p-2 border-2 border-white rounded-xl">
      <h1>Payment Form</h1>


      <div className="flex flex-col gap-2">
        {/*
        <label className="text-white">Store Code</label>
        <input type="text" value={storecode} readOnly />

        <label className="text-white">Member ID</label>

        <input type="text" value={memberid} readOnly />

        <label className="text-white">Wallet Address</label>

        <input type="text" value={walletAddress} readOnly />
        */}

        <div className='grid grid-cols-2 gap-2'>

          <div className="flex flex-col gap-2">
            <label className="text-white">Store Code</label>
            <input type="text" value={storecode} readOnly />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-white">Member ID</label>
            <input type="text" value={memberid} readOnly />
          </div>
        
        </div>

        <div className='grid grid-cols-1 gap-2'>

          <div className="flex flex-col gap-2">
            <label className="text-white">Wallet Address</label>
            <input type="text" value={walletAddress} readOnly />
          </div>

        </div>

        {/* qr code */}

        <div className="flex flex-col gap-2">
          <label className="text-white">QR Code</label>

          {walletAddress &&

            <div className="flex flex-col items-center justify-center">
 
            <Canvas
              text={walletAddress}
              options={{
                //level: 'M',
                margin: 2,
                scale: 4,
                width: 200,
                color: {
                    dark: '#000000FF',
                    light: '#FFFFFFFF',
                },
              }}
            />

            </div>

          }
        </div>






      </div>

    </div>
  );


}
