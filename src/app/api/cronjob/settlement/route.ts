import { NextResponse, NextRequest } from 'next/server';

import {
  getAllUsersForSettlementOfStore,
  updateSettlementAmountOfFee,
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


/*
import {

  useContract,
  useContractRead,

} from '@thirdweb-dev/react';

*/

/*
import { Network, Alchemy } from 'alchemy-sdk';




const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.MATIC_MAINNET, // Replace with your network.
};
*/



const chain = polygon;


// USDT Token (USDT)
const tokenContractAddressUSDT = '0xc2132D05D31c914a87C6611C10748AEb04B58e8F';



const client = createThirdwebClient({
  secretKey: process.env.THIRDWEB_SECRET_KEY || "",
});


const contract = getContract({
  client,
  chain: chain,
  address: tokenContractAddressUSDT, // erc20 contract from thirdweb.com/explore
});






// sync function

const processSongpa = async (
  walletPrivateKey: string
) => {


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

  console.log('walletAddress: ' + walletAddress);




  /*
  const balance = await getBalance({
    contract,
    address: walletAddress,
  });
  

  const amount = balance.displayValue;
  */


  //The below token contract address corresponds to USDT
  //const tokenContractAddresses = ["0xdAC17F958D2ee523a2206206994597C13D831ec7"];

  //try {


  const tokenContractAddresses = [tokenContractAddressUSDT];
  



  
         // call the method to return the token balances for this address
         // random number
         const resuestId =  Math.floor(Math.random() * 1000);

         // eth
         ///const data = await fetch(`https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`, {
         // polygon
         // https://polygon-mainnet.g.alchemy.com/v2/your-api-key
 
         // https://polygon-mainnet.alchemyapi.io/v2/your-api-key
 
         const data = await fetch(`https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`, {
 
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify({
                 jsonrpc: '2.0',
                 method: 'alchemy_getTokenBalances',
                 params: [walletAddress, [tokenContractAddressUSDT]],
                 id: resuestId,
             }),
         });
 
         const response = await data.json() as any;
 
         ///console.log(response);
         /*
         {
             jsonrpc: '2.0',
             id: '1',
             result: {
                 address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
                 tokenBalances: [ [Object] ]
             }
         }
 
         $wei = hexdec($result['tokenBalances']['0']['tokenBalance']);
 
         $balance = $wei / pow(10, 18);
 
 
         */
 
 
         const balanceBigNumber = parseInt(response.result.tokenBalances[0].tokenBalance);
 
         ///console.log('balanceBigNumber: ' + balanceBigNumber);
 
         const balance = balanceBigNumber / Math.pow(10, 6);
 
         console.log('walletAddress: ' + walletAddress + ' balance: ' + balance);

    



  const amount = balance + '';
  

  /*
  const balance = await getBalance({
    contract,
    address: walletAddress,
  });

  const amount = balance.displayValue;
  */
  



  console.log("parseFloat amount", parseFloat(amount));




 

    if (parseFloat(amount) > 0.0) {

      try {




        ///const tx = await sendAndConfirmTransaction({


        // 0xAeB385c91131Efd90d60b85D143Dd0467e161a7d is store wallet address

        const toAddressStore = '0xAeB385c91131Efd90d60b85D143Dd0467e161a7d';

        // 0.99 USDT to this address

        const sendAmountToStore = parseInt(Number(parseFloat(amount) * 0.99 * 1000000.0).toFixed(0)) / 1000000.0;




        const toAddressFee = '0xcF8EE13900ECb474e8Ce89E7868C7Fd1ae930971';

        
        // get 1% of amount

        const sendAmountToFee = parseInt(Number(Math.floor( (parseFloat(amount) - sendAmountToStore) * 1000000.0 )).toFixed(0)) / 1000000.0;


        console.log('walletAddress: ' + walletAddress + ' amount: ' + amount, 'sendAmountToStore: ' + sendAmountToStore, 'sendAmountToFee: ' + sendAmountToFee);


        
        if (sendAmountToStore > 0.0) {

          try {

          const transactionSendToStore = transfer({
            contract,
            to: toAddressStore,
            amount: sendAmountToStore,
          });

          const sendDataStore = await sendAndConfirmTransaction({
            transaction: transactionSendToStore,
            account: account,
          });

          console.log("Sent successfully!");

          console.log(`Transaction hash: ${sendDataStore.transactionHash}`);

          updateSettlementAmountOfFee(walletAddress, String(sendAmountToFee));



          


        } catch (error) {
            
          console.log("walletAddress: " + walletAddress + " error=====>" + error);

        }



          // 10 seconds sleep
          /*
          await new Promise(resolve => setTimeout(resolve, 10000));



          const transactionSendToFee = transfer({
            contract,
            to: toAddressFee,
            amount: sendAmountToFee,
          });

          const sendDataFee = await sendAndConfirmTransaction({
            transaction: transactionSendToFee,
            account: account,
          });

          console.log("Sent successfully!");

          console.log(`Transaction hash: ${sendDataFee.transactionHash}`);
          */


        }
          

        






        /*
        return NextResponse.json(
          { success: true, message: 'GET Request Success' },
          { status: 200 }
        );
        */
        




      } catch (error) {

        console.log("walletAddress: " + walletAddress + " error=====>" + error);

        ///console.log("error=====>" + error);

        /*
        return NextResponse.json(
          `First Error: ${error}`,
          { status: 500 }
        );
        */
      }

    }


    return {
      walletAddress: walletAddress,
      amount: amount,
    };

}









/* ======================================

======================================= */


export const GET = async (req: NextRequest, res: NextResponse) => {




  const limit = 100;
  const page = 1;

  const results = await getAllUsersForSettlementOfStore(limit, page) as any;

  //console.log('results: ' + JSON.stringify(results));
  //{"totalCount":1,"users":[{"_id":"61f7b1b1b3b3b0001f000001","name":"John Doe","email":"aaa"}]}

  const users = results.users;
  const totalCount = results.totalCount;


  /////console.log('users: ' + JSON.stringify(users));
  console.log('/api/cronjob/settlement === getAllUsers === count: ' + users.length);



  // async function



  /*
  users.map(async (user: any) => {




    const walletPrivateKey = user.walletPrivateKey;


    const data = await processSongpa(walletPrivateKey);

    ///console.log('data: ' + JSON.stringify(data));

    const walletAddress = data.walletAddress;




  } );
   */




  try {


    for (let i = 0; i < users.length; i++) {

      const user = users[i];

      const walletPrivateKey = user.walletPrivateKey;

      //console.log('walletPrivateKey: ' + walletPrivateKey);

      
      const data = await processSongpa(
        walletPrivateKey
      );
      

      ///console.log('data: ' + JSON.stringify(data));

      //const walletAddress = data.walletAddress;

      //console.log('walletAddress: ' + walletAddress);
      


    }

  } catch (error) {
      
      console.log("error=====>" + error);
  
  }
    

  console.log('users.length: ' + users.length);


  
  return NextResponse.json(
    { success: true, message: 'GET Request Success' },
    { status: 200 }
  );
  

  
};

