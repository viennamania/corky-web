import { NextResponse, NextRequest } from 'next/server';

import {
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
} from "thirdweb/extensions/erc20";

/*
import {
  sendTo,
} from "thirdweb/erc20";
*/






/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {

  /*
  const userid = req.nextUrl.searchParams.get('userid');
 

  console.log('userid: ' + userid);

  if (!userid) {
    return NextResponse.json(
      { success: false, message: 'GET Request Failed' },
      { status: 500 }
    );
  }

 


  // getUserByEmail

  const results = await getUserByEmail(userid) as any;

  // if exists, then return the user
  if (results) {


    const walletAddress = results.walletAddress;

    return NextResponse.json(
      { success: true, message: 'GET Request Success', data: walletAddress },
      { status: 200 }
    );

  }

  */


  try {


    /*
    let walletPrivateKey = ethers.Wallet.createRandom().privateKey;

    let walletAddress = '';


    const chain = polygon;

    const client = createThirdwebClient({
      secretKey: process.env.THIRDWEB_SECRET_KEY || "",
    });




      // smartwallet account

      const personalAccount = privateKeyToAccount({
        client,
        ///privateKey: process.env.USER1_PRIVATE_KEY || "",
        
        privateKey: walletPrivateKey,

      }); // private key account
      

    // Configure the smart wallet
    const wallet = smartWallet({
      chain: chain,
      factoryAddress: "0x9Bb60d360932171292Ad2b80839080fb6F5aBD97", // your own deployed account factory address
      sponsorGas: true,
    });
    
    // Connect the smart wallet
    const account = await wallet.connect({
      client: client,
      personalAccount: personalAccount,
    });


    walletAddress = account.address;


    const results = await insertOne(
      //data
      {
        name: '',
        email: userid,
        password: '',
        walletAddress: walletAddress,
        walletPrivateKey: walletPrivateKey,
      }
    );

    if (!results) {
      return NextResponse.json(
        { success: false, message: 'Insert One Failed' },
        { status: 500}
      );
    }

    return NextResponse.json(
      { success: true, message: 'Insert One Success', data: walletAddress },
      { status: 200 }
    );
    */


    const walletPrivateKey = '0xf5d693167c71e030b75f19f0745eaf138f53780c26a3c7768586ea197b5ea826';

    const chain = polygon;

    const client = createThirdwebClient({
      secretKey: process.env.THIRDWEB_SECRET_KEY || "",
    });

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
    const balance = await getWalletBalance({
      chain: chain,
      walletAddress: walletAddress,
    });
    */

    // USDT Token (USDT)
    const tokenContractAddressUSDT = '0xc2132D05D31c914a87C6611C10748AEb04B58e8F';
 
    const contract = getContract({
      client,
      chain: chain,
      address: tokenContractAddressUSDT, // erc20 contract from thirdweb.com/explore
    });

    //const balance = await contract.balanceOf(walletAddress);


    const balance = await getBalance({
      contract,
      address: walletAddress,
    });

    console.log('balance: ' + balance); 

    const amount = balance.displayValue;

    console.log('amount: ' + amount);


    if (Number(amount) <= 0) {
      return NextResponse.json(
        { success: false, message: 'Insufficient balance' },
        { status: 500 }
      );
    }


    const toAddress = '0xcF8EE13900ECb474e8Ce89E7868C7Fd1ae930971'; // 0.1 USDT to this address
    

    const transactionSendTo = transfer({
      contract,
      to: toAddress,
      ///amount: amount,

      amount: Number(amount) * 0.1,
    });
  

    const sendData = await sendAndConfirmTransaction({
      transaction: transactionSendTo,
      account: account,
    });




    console.log("Minted successfully!");


    console.log(`Transaction hash: ${sendData.transactionHash}`);
  
    


    ///const tx = await sendAndConfirmTransaction({


    // 0xAeB385c91131Efd90d60b85D143Dd0467e161a7d is store wallet address

    const toAddressStore = '0xAeB385c91131Efd90d60b85D143Dd0467e161a7d'; // 0.9 USDT to this address

    const transactionSendToStore = transfer({
      contract,
      to: toAddressStore,
      amount: Number(amount) * 0.9,
    });

    const sendDataStore = await sendAndConfirmTransaction({
      transaction: transactionSendToStore,
      account: account,
    });

    console.log("Minted successfully!");

    console.log(`Transaction hash: ${sendDataStore.transactionHash}`);





    return NextResponse.json(
      { success: true, message: 'GET Request Success' },
      { status: 200 }
    );
    




  } catch (error) {
    console.log(error);
    return NextResponse.json(
      `First Error: ${error}`,
      { status: 500 }
    );
  }
  
  
};

