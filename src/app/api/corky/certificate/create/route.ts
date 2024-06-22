import { NextResponse, NextRequest } from 'next/server';

import { insertOne } from '@/lib/api/certificate';

import { getUserWalletPrivateKeyByWalletAddress } from '@/lib/api/user';

///import { get } from 'lodash';


import {
  createThirdwebClient,
  getContract,
  sendAndConfirmTransaction,
} from "thirdweb";

//import { polygonAmoy } from "thirdweb/chains";
import { polygon } from "thirdweb/chains";


import {
  mintTo,
  mintAdditionalSupplyTo,
  totalSupply,
  nextTokenIdToMint,

  safeTransferFrom,

  tokenUri,

} from "thirdweb/extensions/erc1155";


import {
  privateKeyToAccount,
  smartWallet,
  getWalletBalance,
  
 } from "thirdweb/wallets";


import { parse } from 'path';
import { Certificate } from 'crypto';


import { upload } from "thirdweb/storage";


/* ======================================

======================================= */
export const POST = async (req: NextRequest, res: NextResponse) => {

  const data = await req.json() as any;

  ///console.log(' product create  data: ' + data);
  

  const walletPrivateKey = await getUserWalletPrivateKeyByWalletAddress(data.creatorWalletAddress);

  console.log('walletPrivateKey: ' + walletPrivateKey);


  if (walletPrivateKey === null) {
    return NextResponse.json(
      { success: false, message: 'walletPrivateKey is null' },
      { status: 500 }
    );
  }



  const chain = polygon;

  const client = createThirdwebClient({
    secretKey: process.env.THIRDWEB_SECRET_KEY || "",
  });
  
  
    
  // smartwallet account
  const personalAccount = privateKeyToAccount({
    client,
    privateKey: process.env.WALLET_PRIVATE_KEY || "",
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


  //console.log("=====Account address: ", account.address);


  // erc1155 contract address
  const nftContractAddress = "0x2682057d39ED5F9E1f296aeD5AE5f3ab6A8626d2";

  const contract = getContract({
    client,
    chain: chain,
    //address: nftDropAddress, // deploy a drop contract from thirdweb.com/explore
    address: nftContractAddress, // deploy a drop contract from thirdweb.com/explore
  });




  const toAddress = data.creatorWalletAddress;

  console.log("toAddress: ", toAddress);

  const imageUrl = data.avatar;


  /*
  {
    "name":"asdf",
    "description":"",
    "image":"ipfs://QmQk2LB6HbhAM8MB3FWhryHz1Cc2pDvBmqnRsXf1adqip8/corky-logo.png",
    "animation_url":"ipfs://QmQk2LB6HbhAM8MB3FWhryHz1Cc2pDvBmqnRsXf1adqip8/pose%20(16).mp4",
    "external_url":"",
    "background_color":"",
    "supply":"10000",
    "customImage":"",
    "customAnimationUrl":""}
  */


  /*
  const uris = await upload({
    client,
    files: [new File(["hello world"], "hello.txt")],
  });
  */

  /*
  const uris = await upload({
    client,
    files: [new File(["hello world"], "hello.txt")],
  });
  */
  
  const transactionMintTo = mintTo({
    contract,
    to: toAddress,
    supply: BigInt(8000),
    nft: {
      name: "Corky Certificate",
      description: "Corky Certificate NFT",


      image: "https://corky.vercel.app/images/corky/certificate.jpg",


      animation_url: imageUrl,

    },
  });

  const sendData = await sendAndConfirmTransaction({
    transaction: transactionMintTo,
    account: account,
  });

  console.log("Minted successfully!");


  console.log(`Transaction hash: ${sendData.transactionHash}`);

  


  // ipfs key from certificateTokenUri

  //const ipfsKey = certificateTokenUri.split("ipfs://")[1];


  // ipfs://QmZXdoAZQUG6JNH2pqEzvcYHkKHDKvQvKf9gx7Q5ipjPGK/0
// https://ipfs.io/ipfs/QmTUbjYKZdN6LByPBEnAsj6FvSA3E7kWJwhviooSf3GEpD/0






  // transfer to 
 


  /*
  const corkyAddress = "0xD9233AcE3EFB93dC47bB920E341049A8605548aE";

  const transactionMintToCorky = mintTo({
    contract,
    to: corkyAddress,
    supply: BigInt(2000),
    nft: {
      name: "Corky Certificate",
      description: "Corky Certificate NFT",
      image: imageUrl,


    },
  });

  const sendDataCorky = await sendAndConfirmTransaction({
    transaction: transactionMintToCorky,
    account: account,
  });
  */


  
  const nextTokenId = await nextTokenIdToMint({
    contract: contract,
  });

  console.log("Next Token ID to mint: ", nextTokenId);
  // BigInt to string
  console.log("Next Token ID to mint: ", nextTokenId.toString());

  

  const tokenId = parseInt(nextTokenId.toString(), 10) - 1;
  

  //  get tokenUri
  const certificateTokenUri = await tokenUri({
    contract,
    tokenId: BigInt(tokenId),
  });

  console.log("certificateTokenUri: ", certificateTokenUri);








  const corkyAddress = "0xD9233AcE3EFB93dC47bB920E341049A8605548aE";


  /*
  // smartwallet account
  const userAccount = privateKeyToAccount({
    client,
    privateKey: walletPrivateKey,
  }); // private key account
  
  
  // Connect the smart wallet
  const userSmartaccount = await wallet.connect({
    client: client,
    personalAccount: userAccount,
  });


  const transactionTransferTo = safeTransferFrom({
    contract,
    from: toAddress,
    to: corkyAddress,
    tokenId: BigInt(tokenId),
    value: BigInt(2000),
    data: "0x",
  });

  const sendData2 = await sendAndConfirmTransaction({
    transaction: transactionTransferTo,
    account: userSmartaccount,
  });

  console.log("Transfered successfully!");

  console.log(`Transaction hash: ${sendData2.transactionHash}`);
  */

  const transactionMintAdditionalSupplyTo = mintAdditionalSupplyTo({
    contract,
    to: corkyAddress,
    tokenId: BigInt(tokenId),
    supply: BigInt(2000),
  });

  const sendData3 = await sendAndConfirmTransaction({
    transaction: transactionMintAdditionalSupplyTo,
    account: account,
  });

  console.log("Minted additional supply successfully!");

  console.log(`Transaction hash: ${sendData3.transactionHash}`);




  

  

  const results = await insertOne(
    {
      creatorWalletAddress: data.creatorWalletAddress,
      contractAddress: nftContractAddress,
      tokenId: tokenId,
      category: data.category,
      avatar: data.avatar,

      certificateTokenUri: certificateTokenUri,

      sku: data.sku,
      listPrice: data.listPrice,
      price: data.price,
      status: data.status,
      rating: data.rating,
      point: data.point,
      stock: data.stock,
      sales: data.sales,
      inquiry: data.inquiry,
    } as any
  
  );

  console.log('certificate / insertOne results: ' + results);
  


  try {
    return NextResponse.json(
      { success: true, message: 'Insert One Success', data: results },
      //{ data: results },
      //{ status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }
  
};

