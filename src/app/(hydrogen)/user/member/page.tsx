import { routes } from '@/config/routes';


///////import { memberData } from '@/data/lefimall/user/member-data';


import { getColumns } from '@/app/shared-corky/user/member-columns';


import UserTableWidget from '@/components/corky/user-table-widget';


import TableLayout from '../table-layout';
import { metaObject } from '@/config/site.config';

import { Button } from '@/components/ui/button';
import { PiDownloadSimpleBold } from 'react-icons/pi';



export const metadata = {
  ...metaObject('User'),
};

const pageHeader = {
  title: '회원',
  breadcrumb: [
    {
      href: "/",
      name: '홈',
    },
    {
      href: routes.user.member,
      name: '회원 관리',
    },
    {
      name: '활성회원',
    },
  ],
};



export default function SearchTablePage() {

  return (
    <TableLayout
      title={pageHeader.title}
      breadcrumb={pageHeader.breadcrumb}
      //data={memberData}
      fileName=""
      //header="Order ID,Name,Email,Avatar,Items,Price,Status,Created At,Updated At"
    >

      {/*
      <div className='mb-5 w-full flex flex-row items-center justify-end'>
        <Button className=" @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100">
          <PiDownloadSimpleBold className="me-1.5 h-[17px] w-[17px]" />
          엑셀다운로드
        </Button>
      </div>
    */}


      <UserTableWidget
        title=""
        
        //variant="minimal"
        variant="modern"
        //////////data={memberData}
        // @ts-ignore
        getColumns={getColumns}
        enablePagination={true}
        
        searchPlaceholder="아이디, 이름, 이메일, 휴대폰번호"

        ////setPageSize={setPageSize}


        className="w min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"

        scroll={{ x: 500, }}
      />

    </TableLayout>
  );
}
