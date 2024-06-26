import { NextResponse, NextRequest } from 'next/server';

import {
  getAllUsers,
  getUserByEmail,
  insertOne
} from '@/lib/api/user';

///import { get } from 'lodash';

import { ethers, N } from "ethers";


import {
  createThirdwebClient,
  getContract,
  sendAndConfirmTransaction,
} from "thirdweb";

//import { polygonAmoy } from "thirdweb/chains";
import { polygon } from "thirdweb/chains";

import {
  privateKeyToAccount,
  smartWallet,
  getWalletBalance,
  
 } from "thirdweb/wallets";


 import {
  mintTo,
  totalSupply,
  transfer,
  
  getBalance,

  balanceOf,

} from "thirdweb/extensions/erc20";
import { getAll } from '@/lib/api/shop';
import { u } from 'uploadthing/dist/types-e8f81bbc';
import { parse } from 'path';

/*
import {
  sendTo,
} from "thirdweb/erc20";
*/






/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {


  const chain = polygon;

  const client = createThirdwebClient({
    secretKey: process.env.THIRDWEB_SECRET_KEY || "",
  });



  // USDT Token (USDT)
  const tokenContractAddressUSDT = '0xc2132D05D31c914a87C6611C10748AEb04B58e8F';

  

  const contract = getContract({
    client,
    chain: chain,
    address: tokenContractAddressUSDT, // erc20 contract from thirdweb.com/explore
  });





  const limit = 100;
  const page = 1;

  const results = await getAllUsers(limit, page) as any;

  //console.log('results: ' + JSON.stringify(results));
  //{"totalCount":1,"users":[{"_id":"61f7b1b1b3b3b0001f000001","name":"John Doe","email":"aaa"}]}

  const users = results.users;
  const totalCount = results.totalCount;


  /////console.log('users: ' + JSON.stringify(users));
  console.log('/api/cronjob/settlement === getAllUsers === totalCount: ' + totalCount);



  // async function

  users.map(async (user: any) => {


    const walletPrivateKey = user.walletPrivateKey;


    ////////////const walletPrivateKey = '0xf5d693167c71e030b75f19f0745eaf138f53780c26a3c7768586ea197b5ea826';



      // balance of wallet

      const personalAccount = privateKeyToAccount({
        client,
        privateKey: walletPrivateKey,
      });

      const wallet = smartWallet({
        chain: chain,
        factoryAddress: "0x9Bb60d360932171292Ad2b80839080fb6F5aBD97", // your own deployed account factory address
        sponsorGas: true,
      });

      const account = await wallet.connect({
        client: client,
        personalAccount: personalAccount,
      });

      const walletAddress = account.address;

      ///console.log('walletAddress: ' + walletAddress);

      /*
      const balance = await getWalletBalance({
        chain: chain,
        walletAddress: walletAddress,
      });
      */



      //const balance = await contract.balanceOf(walletAddress);

      
      const balance = await getBalance({
        contract,
        address: walletAddress,
      });
      const amount = Number(balance.displayValue).toFixed(2);

      const symbol = balance.symbol;

      console.log('walletAddress: ' + walletAddress + ' amount: ' + amount, 'symbol: ' + symbol);
      
      /*
      {Number(tokenBalance?.displayValue).toFixed(2)}</b>{' '}
                  {tokenBalance?.symbol}
      */

      /*
      const balance = await balanceOf({
        contract,
        address: walletAddress,
      });

      // bitInt to string
      const amount = balance.toString();
      */
      
      



      if (parseFloat(amount) > 0.0) {

        try {




          ///const tx = await sendAndConfirmTransaction({


          // 0xAeB385c91131Efd90d60b85D143Dd0467e161a7d is store wallet address

          const toAddressStore = '0xAeB385c91131Efd90d60b85D143Dd0467e161a7d'; // 0.9 USDT to this address

          const sendAmountToStore = Math.floor(parseFloat(amount) * 0.9 * 10) / 10;


          const toAddressFee = '0xcF8EE13900ECb474e8Ce89E7868C7Fd1ae930971'; // 0.1 USDT to this address
          
          // get 10% of amount

          const sendAmountToFee = Math.floor( (parseFloat(amount) - sendAmountToStore) * 10) / 10;


          console.log('walletAddress: ' + walletAddress + ' amount: ' + amount, 'sendAmountToStore: ' + sendAmountToStore, 'sendAmountToFee: ' + sendAmountToFee);


          if (sendAmountToStore > 0.0) {

            const transactionSendToStore = transfer({
              contract,
              to: toAddressStore,
              amount: sendAmountToStore,
            });

            const sendDataStore = await sendAndConfirmTransaction({
              transaction: transactionSendToStore,
              account: account,
            });

            console.log("Minted successfully!");

            console.log(`Transaction hash: ${sendDataStore.transactionHash}`);




            if (sendAmountToFee > 0.0) {

              const transactionSendTo = transfer({
                contract,
                to: toAddressFee,
                amount: sendAmountToFee,
              });
            
  
              const sendData = await sendAndConfirmTransaction({
                transaction: transactionSendTo,
                account: account,
              });
  
  
  
  
              console.log("Minted successfully!");
  
  
              console.log(`Transaction hash: ${sendData.transactionHash}`);
            
              
            }



          }






          /*
          return NextResponse.json(
            { success: true, message: 'GET Request Success' },
            { status: 200 }
          );
          */
          




        } catch (error) {

          console.log("error=====>" + error);

          /*
          return NextResponse.json(
            `First Error: ${error}`,
            { status: 500 }
          );
          */
        }


      }


  } );
    



  return NextResponse.json(
    { success: true, message: 'GET Request Success' },
    { status: 200 }
  );

  
};

