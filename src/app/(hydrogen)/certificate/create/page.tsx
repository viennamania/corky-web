'use client';

import { routes } from '@/config/routes';



import PageHeader from '@/app/shared/page-header';
import ProfileSettingsNav from '@/app/shared/account-settings/navigation';
import { metaObject } from '@/config/site.config';

import { Button } from '@/components/ui/button';
import { PiDownloadSimpleBold, PiList, PiRecordLight, } from 'react-icons/pi';

import { useRouter } from 'next/navigation';

import { useState, useEffect } from 'react';

///import { data } from '@/data/lefimall/product/data';

import Image from 'next/image';


import CreateInfo from '@/app/shared-corky/product/product-create';


/*
export const metadata = {
  ...metaObject('상품관리'),
};
*/


const pageHeader = {
  title: '저작권 관리',
  breadcrumb: [
    {
      href: "/",
      name: '홈',
    },
    {
      href: routes.certificate.index,
      name: '저작권',
    },
    {
      href: routes.certificate.index,
      name: '저작권 목록',
    },
    {
      name: '저자작권 등록',
    }
  ],
};




export default function Page() {


  return (

    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>

      <div className="flex items-center space-x-4">

        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          onClick={() => window.history.back()}
        >
          <PiList className="me-2 h-4 w-4" />
          List
        </button>

      </div>

      </PageHeader>

      <div className="@container">
        
        <CreateInfo/>
        

      </div>

      
    </>
  );


}
