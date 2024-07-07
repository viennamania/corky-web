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




  // /api/erc20/transfer?userid

  const [transferArray, setTransferArray] = useState([]);

  useEffect(() => {


    if (storecode && memberid) {

      fetch('/api/cryptopay/erc20/transfer?storecode=' + storecode + '&memberid=' + memberid)
        .then((response) => response.json())
        .then((data : any) => {
          //console.log(data);
          setTransferArray(data.data);
        });
  
    }

    // reload the data from the server every 5 seconds

    const interval = setInterval(() => {

      if (storecode && memberid) {

        fetch('/api/cryptopay/erc20/transfer?storecode=' + storecode + '&memberid=' + memberid)
          .then((response) => response.json())
          .then((data : any) => {
            
            console.log(data);


            setTransferArray(data?.data);

          });
    
      }

    }, 5000);

    return () => clearInterval(interval);


  
    } , [storecode, memberid]);





    console.log('transferArray: ', transferArray);
    /*
    {
    "member_id": "creath.park@gmail.com",
    "store_code": "2000002",
    "dealer_seq": "100000001",
    "txid": "0x9269159f51c387cba385e4226c41f5c28346d5f82d357dff5d0069f2917ee194",
    "regist_date": "2024-07-05 00:49:53",
    "eth_bill": "8.3",
    "txid_time": "1720140593",
    "category": "receive",
    "eth_fee": "0.083",
    "eth_dealer": "11111",
    "eth_finish": "8.217",
    "eth_php": "10.00",
    "eth_php_user": "1381",
    "eth_php_finish": "11462.3",
    "other_address": "0x",
    "balance_yn": "Y",
    "ins_date": "2024-07-05 00:49:53",
    "coin_type": "USDT",
    "fee_amount": null,
    "dealer_balance_yn": "Y",
    "block_number": "14478428",
    "confirmations": "100",
    "before_eth_php": null,
    "before_eth_php_user": null,
    "before_eth_php_finish": null,
    "etc": null
    }
    */

    console.log('transferArray count: ', transferArray.length);



  /*
  <div className='bg-gray-100 p-6 rounded-3xl max-w-md'>
  */

  return (
    <div className=" max-w-md min-h-screen bg-gray-100
      flex flex-col items-center justify-start gap-3 p-2 border-2 border-white rounded-3xl">
      <h1>Payment Form</h1>



      <div className="bg-orange-100 rounded-lg p-4 max-w-md">
        <div className="flex items-start space-x-3">
          <div className="bg-orange-400 rounded-full p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">This is a static wallet</h2>
            <p className="mt-1 text-sm text-gray-700">You can pay this bill as many times as you want, for different amounts.</p>
          </div>
        </div>
      </div>

      <div className='bg-gray-100 p-4 rounded-lg max-w-md'>
        <h2 className='text-xl font-bold mb-2'>Cryptocurrency transfer</h2>
        <div className='flex justify-between items-center'>
          <div>
            <p className='text-sm text-gray-600'>Currency</p>
            <p className='font-semibold'>USDT</p>
          </div>
          <div className='text-right'>
            <p className='text-sm text-gray-600'>Network</p>
            <p className='font-semibold'>Polygon</p>
          </div>
        </div>
      </div>



      <div className="flex flex-col gap-2">
        {/*
        <label className="text-white">Store Code</label>
        <input type="text" value={storecode} readOnly />

        <label className="text-white">Member ID</label>

        <input type="text" value={memberid} readOnly />

        <label className="text-white">Wallet Address</label>

        <input type="text" value={walletAddress} readOnly />
        */}

        <div className='grid grid-cols-2 gap-2 w-96'>

          {/*
          <div className="flex flex-col gap-2">
            <label className="text-white">Store Code</label>
            <input type="text" value={storecode} readOnly />
          </div>
          */}

          <div className="flex flex-col gap-2">
            <label className="text-xl font-bold">Member ID</label>
            <input
              className='bg-gray-200 p-2 rounded-md text-xs'
              type="text" value={memberid} readOnly />
          </div>
        
        </div>

        <div className='grid grid-cols-1 gap-2 mt-5'>

          <div className="flex flex-col gap-2">
            {/* mkae ' to escape character */}
            <label className="text-xl font-bold">Recipient&apos;s Wallet Address</label>
            <input
              className='bg-gray-200 p-2 rounded-md text-xs '
              type="text" value={walletAddress} readOnly />
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


        {/* transfer history */}
        <div className="flex flex-col gap-2">
          {transferArray.length > 0 &&
            <table className="table-auto">
              <thead>
                <tr>
                  <th className="border border-white">Date</th>
                  <th className="border border-white">Amount</th>
                  <th className="border border-white">Fee</th>
                  <th className="border border-white">Finish</th>
                  <th className="border border-white">PHP</th>
                  <th className="border border-white">PHP Finish</th>
                  <th className="border border-white">Coin Type</th>
                </tr>
              </thead>
              <tbody>
                {transferArray.map((transfer : any, index : number) => (
                  <tr key={index}>
                    <td className="border border-white">{transfer.regist_date}</td>
                    <td className="border border-white">{transfer.eth_bill}</td>
                    <td className="border border-white">{transfer.eth_fee}</td>
                    <td className="border border-white">{transfer.eth_finish}</td>
                    <td className="border border-white">{transfer.eth_php}</td>
                    <td className="border border-white">{transfer.eth_php_finish}</td>
                    <td className="border border-white">{transfer.coin_type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          }
        </div>




      </div>

    </div>
  );


}