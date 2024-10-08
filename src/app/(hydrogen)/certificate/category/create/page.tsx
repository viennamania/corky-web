import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';


import InfoCreate from '@/app/shared-corky/channel/create-category';


import ImportButton from '@/app/shared/import-button';
import { metaObject } from '@/config/site.config';


export const metadata = {
  ...metaObject('등록하기'),
};


const pageHeader = {
  title: '카테고리관리',
  breadcrumb: [
    {
      href: "/",
      name: 'Home',
    },
    {
      href: routes.product.index,
      name: '상품',
    },
    {
      href: routes.product.category,
      name: '카테고리관리',
    },
    {
      name: '등록하기',
    }
  ],
};

export default function CreateOrderPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>

      </PageHeader>
      
      <InfoCreate />

      {/*
      <CreateOrder />
      */}
    </>
  );
}
