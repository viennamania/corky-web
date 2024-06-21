import { NextResponse, NextRequest } from 'next/server';

import {
  getUserByEmail,
  insertOne
} from '@/lib/api/user';

///import { get } from 'lodash';

import { ethers } from "ethers";


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

