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
      name: '저작권 등록신청',
    }
  ],
};




export default function Page() {


  return (

    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>


        <Button

          size="lg"
          variant="solid"
          color="primary"
          onClick={() => window.history.back()}
        >
          <PiList className="me-2 h-5 w-5" aria-hidden="true" />
          목록
        </Button>

      

      </PageHeader>

      <div className="@container">
        
        <CreateInfo/>
        

      </div>

      
    </>
  );


}
