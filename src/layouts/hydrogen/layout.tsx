import Header from './header-refi';
import Sidebar from '@/layouts/hydrogen/sidebar';


import { useSession, signOut } from 'next-auth/react';

export default function HydrogenLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  const { data: session, status } = useSession();


  return (
    <main className="flex min-h-screen flex-grow flex-col dark:bg-gray-100 dark:text-gray-900">

      <div className="fixed top-0 left-0 z-50 w-full h-1 bg-gradient-to-r from-[#f472b6] via-[#fbbf24] to-[#60a5fa]"></div>

      { session ? (
        
        <>
          <Sidebar className="fixed hidden dark:bg-gray-50 xl:block" />


          <div className="flex w-full flex-col xl:ms-[270px] xl:w-[calc(100%-270px)] 2xl:ms-72 2xl:w-[calc(100%-288px)] ">
          

            <Header />
            <div className="flex flex-grow flex-col px-4 pb-6 pt-2 md:px-5 lg:px-6 lg:pb-8 3xl:px-8 3xl:pt-4 4xl:px-10 4xl:pb-9">
              {children}
            </div>

          </div>
        </>

      ) : (
        
        <div className="flex flex-grow flex-col px-4 pb-6 pt-2 md:px-5 lg:px-6 lg:pb-8 3xl:px-8 3xl:pt-4 4xl:px-10 4xl:pb-9">
          {children}
        </div>

      )}



 
          {/* black backgroud footer
            copy right
            terms of service
            privacy policy
            buttom fixed
          */}
          {/*
          <div className="fixed bottom-0 left-0 z-50 w-full h-14 bg-black text-white">
            <div className="mt-10 container mx-auto text-center">
              <p className="text-sm">© 2024 Corky. All rights reserved.</p>
            </div>
          </div>
          */}

     



    </main>
  );
}
