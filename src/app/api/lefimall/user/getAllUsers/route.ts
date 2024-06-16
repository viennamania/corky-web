import { NextResponse, NextRequest } from 'next/server';

import { getUser, getAllUsers, getUserCount } from '@/lib/api/user';

///import { get } from 'lodash';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {

  
  // _limit=10&_page=${currentPage}

  //const { _limit, _page } = req.query;

  //const currentPage = _page ? _page : 1;

  

  const _limit = req.nextUrl.searchParams.get('_limit');
  const _page = req.nextUrl.searchParams.get('_page');

  console.log('_limit: ' + _limit);
  console.log('_page: ' + _page);

  

  const results = await getAllUsers(
    parseInt(_limit as string, 10),
    parseInt(_page as string, 10),
  );
  

  
        /*
        id,
        name,
        nickname,
        email,
        avatar,
        regType,
        mobile,
        gender,
        weight,
        height,
        birthDate,
        purpose,
        marketingAgree,
        createdAt,
        updatedAt,
        deletedAt,
        loginedAt,
        followers ,
        emailVerified,
        */
  

  ///console.log("getAllUsers results=", results);

  
  const data = results.flatMap(({ users }) =>
    //users.map((user) => ({ params: { username: user.username } }))

    //users.map((user) => ({ user }))
    users.map((user) => ({

      id: user.id,
      name: user.name,
      nickname: user.nickname,
      email: user.email,
      avatar: user.avatar,
      regType: user.regType,
      mobile: user.mobile,
      gender: user.gender,
      weight: user.weight,
      height: user.height,
      birthDate: user.birthDate,
      purpose: user.purpose,
      marketingAgree: user.marketingAgree,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
      loginedAt: user.loginedAt,
      followers : user.followers,
      emailVerified: user.emailVerified,


    }))

  );
  

  ////const result = arr1.flatMap((num) => (num === 2 ? [2, 2] : 1));

  //const paths = results.flatMap(( users ) => ( users ));

  //console.log(paths);
  

  /* time seleep */
  /*
  const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  await sleep(1000);
  */


  try {
    return NextResponse.json({ data: data }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
