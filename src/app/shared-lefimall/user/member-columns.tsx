'use client';

import Link from 'next/link';

import { HeaderCell } from '@/components/ui/refi/table';

import { Badge } from '@/components/ui/badge';
import { Title, Text } from '@/components/ui/text';
import { Tooltip } from '@/components/ui/tooltip';
import { ActionIcon } from '@/components/ui/action-icon';
import { routes } from '@/config/routes';
import EyeIcon from '@/components/icons/eye';
import PencilIcon from '@/components/icons/pencil';
import TableAvatar from '@/components/ui/avatar-card';

// gender Pi icon
import { PiGenderMale, PiGenderFemale } from 'react-icons/pi';


import DateCell from '@/components/ui/date-cell';

import DeletePopover from '@/app/shared/delete-popover';
import { Button } from 'rizzui';

import { Router } from 'next/router';

function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case 'pending':
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-orange-dark">{status}</Text>
        </div>
      );
    case 'completed':
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">{status}</Text>
        </div>
      );
    case 'cancelled':
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium text-red-dark">{status}</Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium text-gray-600">{status}</Text>
        </div>
      );
  }
}



type Columns = {
  sortConfig?: any;
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
};




export const getColumns = ({
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,
}: Columns) => [

  {
    title: <HeaderCell title="No" />,
    dataIndex: 'id',
    key: 'id',
    width: 90,
    render: (value: string) => <Text className='  text-center ' >{value}</Text>,
  },

 
  {
    title: (
      <HeaderCell
        title="가입일시"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'createdAt'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('createdAt'),
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 180,
    render: (value: Date) => (
      < DateCell
        date={ value }
        className='  text-center '
      />
    ),
  },

  {
    title: <HeaderCell title="가입유형" />,
    dataIndex: 'regType',
    key: 'regType',
    width: 110,
    render: (value: string) => (
      <Text className='  text-center '>{value}</Text>
    ),
  },

  {
    title: (
        <HeaderCell title="이메일(ID)" />
    ),
    dataIndex: 'email',
    key: 'email',
    width: 200,
    hidden: 'email',
    render: (_: any, row: any) => (
      <div>
        {/*
        <TableAvatar
          src={row.avatar}
          name={row.name}
          description={row.email}
        />
        */}
        <Link
          href={routes.user.memberDetails(row.id)}
          className=' hover:font-bold hover:underline'
          
          //size="sm"
          //className=" bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          //onClick={() => {
            //console.log('row', row);
            //routes.eCommerce.editOrder(row.id);
            
            ///routes.user.memberDetails(row.id);

            // goto user/member/[id]/page.tsx

            /*push({
              pathname: routes.user.memberDetails(row.id),
              query: { id: row.id },
            });
            */

          //}}
        >
          <Text className='  text-center '>{row.email?.toLowerCase()}</Text>
        </Link>
      </div>
    ),
   
  },
  {
    title: <HeaderCell title="이름" />,
    dataIndex: 'name',
    key: 'name',
    width: 150,
    render: (_: any, row: any) => (
      <Text className='  text-center '>{row.name}</Text>
    ),
  },

  {
    title: <HeaderCell title="닉네임" />,
    dataIndex: 'nickname',
    key: 'nickname',
    width: 150,
    render: (_: any, row: any) => (
      <Text className='  text-center '>{row.nickname}</Text>
    ),
  },

  // Gender (성별) icoin (남, 여) PiGenderMale, PiGenderFemale

  {
    title: <HeaderCell title="성별" />,
    dataIndex: 'gender',
    key: 'gender',
    width: 100,
    render: (value: string) => (
      (value=='남' ? ( // man
        <div className='flex flex-row items-center justify-center gap-3'>
          <PiGenderMale className='h-5 w-5' />
          <Text className="">{value}</Text>
        </div>
        ) : (value=='여') ? (
          <div className='flex flex-row items-center justify-center gap-3'>
            <PiGenderFemale className='h-5 w-5' />
            <Text className="">{value}</Text>
          </div>
        ) : (
          <div className='flex flex-row items-center justify-center gap-3'>
            <PiGenderMale className='h-5 w-5' />
            <Text className="">{value}</Text>
          </div>
        )

      )
    ),
  },


  {
    title: <HeaderCell title="휴대폰" />,
    dataIndex: 'mobile',
    key: 'mobile',
    width: 150,
    render: (value: string) => (
      <Text className='  text-center '>{value}</Text>
    ),
  },
  {
    title: <HeaderCell title="최근로그인" />,
    dataIndex: 'loginedAt',
    key: 'loginedAt',
    width: 150,
    render: (_: any, row: any) => (
      < DateCell
        date={ row.loginedAt }
        className='  text-center '
      />
    ),
  },


  /*
  {
    title: <HeaderCell title="Items" />,
    dataIndex: 'items',
    key: 'items',
    width: 150,
    render: (value: string) => (
      <Text className="">{value}</Text>
    ),
  },
  */
  /*
  {
    title: (
      <HeaderCell
        title="Price"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'price'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('price'),
    dataIndex: 'price',
    key: 'price',
    width: 150,
    render: (value: string) => (
      <Text className="">${value}</Text>
    ),
  },


  {
    title: (
      <HeaderCell
        title="Modified"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'updatedAt'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('updatedAt'),
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    width: 200,
    render: (value: Date) => <DateCell date={value} />,
  },
  {
    title: <HeaderCell title="Status" />,
    dataIndex: 'status',
    key: 'status',
    width: 140,
    render: (value: string) => getStatusBadge(value),
  },
  */
  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 130,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-4">

        {/*
        <Tooltip
          size="sm"
          content={() => 'Edit Order'}
          placement="top"
          color="invert"
        >
          <Link href={routes.eCommerce.editOrder(row.id)}>
            <ActionIcon
              tag="span"
              size="sm"
              variant="outline"
              className="hover:text-gray-700"
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        */}
        <Tooltip
          size="sm"
          content={() => '보기'}
          placement="top"
          color="invert"
        >
          <Link href={routes.user.memberDetails(row.id)}>
            <ActionIcon
              tag="span"
              size="sm"
              variant="outline"
              className="hover:text-gray-700"
            >
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        {/*
        <DeletePopover
          title={`Delete the order`}
          description={`Are you sure you want to delete this #${row.id} order?`}
          onDelete={() => onDeleteItem(row.id)}
        />
        */}
      </div>
    ),
  },
  
];



export const getWidgetColumns = ({
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,
}: Columns) => [
  {
    title: (
      <HeaderCell title="Order ID" className="ps-4 [&>div]:whitespace-nowrap" />
    ),
    dataIndex: 'id',
    key: 'id',
    width: 90,
    render: (value: string, row: any) => (
      <Link
        href={routes.eCommerce.editOrder(row.id)}
        className="ps-4 hover:text-gray-900 hover:underline"
      >
        #{value}
      </Link>
    ),
  },
  {
    title: <HeaderCell title="Customer" />,
    dataIndex: 'customer',
    key: 'customer',
    width: 300,
    hidden: 'customer',
    render: (_: any, row: any) => (
      <TableAvatar
        src={row.avatar}
        name={row.name}
        description={row.email}
      />
    ),
  },
  {
    title: <HeaderCell title="Items" />,
    dataIndex: 'items',
    key: 'items',
    width: 150,
    render: (value: string) => (
      <Text className="">{value}</Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Price"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'price'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('price'),
    dataIndex: 'price',
    key: 'price',
    width: 150,
    render: (value: string) => (
      <Text className="">${value}</Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Created"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'createdAt'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('createdAt'),
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 200,
    render: (createdAt: Date) => <DateCell date={createdAt} />,
  },
  {
    title: (
      <HeaderCell
        title="Modified"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'updatedAt'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('updatedAt'),
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    width: 200,
    render: (value: Date) => <DateCell date={value} />,
  },
  {
    title: <HeaderCell title="Status" />,
    dataIndex: 'status',
    key: 'status',
    width: 140,
    render: (value: string) => getStatusBadge(value),
  },
  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 130,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip
          size="sm"
          content={() => 'Edit Order'}
          placement="top"
          color="invert"
        >
          <Link href={routes.eCommerce.editOrder(row.id)}>
            <ActionIcon
              tag="span"
              size="sm"
              variant="outline"
              aria-label={'Edit Order'}
              className="hover:text-gray-700"
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <Tooltip
          size="sm"
          content={() => 'View Order'}
          placement="top"
          color="invert"
        >
          <Link href={routes.eCommerce.orderDetails(row.id)}>
            <ActionIcon
              tag="span"
              size="sm"
              variant="outline"
              aria-label={'View Order'}
              className="hover:text-gray-700"
            >
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <DeletePopover
          title={`Delete the order`}
          description={`Are you sure you want to delete this #${row.id} order?`}
          onDelete={() => onDeleteItem(row.id)}
        />
      </div>
    ),
  },
];
