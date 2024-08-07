'use client';

import Link from 'next/link';
import { HeaderCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Title, Text } from '@/components/ui/text';
import { Tooltip } from '@/components/ui/tooltip';
import { ActionIcon } from '@/components/ui/action-icon';
import { routes } from '@/config/routes';
import EyeIcon from '@/components/icons/eye';
import PencilIcon from '@/components/icons/pencil';
import TableAvatar from '@/components/ui/avatar-card';

import { PiCheckCircleFill } from 'react-icons/pi';

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

  onClickUser: (id: string) => void;
};




export const getColumns = ({
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,

  onClickUser,
}: Columns) => [

  {
    title: <HeaderCell title="No" />,
    dataIndex: 'id',
    key: 'id',
    width: '5%',
    render: (value: string) => (

      <Link
        href={"/survey/"+value}
        className="ps-4 hover:font-bold hover:underline"
      >
      <Text className='text-center'>{value}</Text>
      </Link>
      
    ),
  },

  {
    title: <HeaderCell title="설문명" />,
    dataIndex: 'surveyName',
    key: 'surveyName',
    width: '10%',
    render: (value: string) => (
      <Text className='text-center'>{value}</Text>
    ),
  },


  {
    title: (
      <HeaderCell
        title="참여일시"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'createdAt'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('createdAt'),
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: '10%',
    render: (value: Date) => <DateCell date={value} className='text-center'/>,
  },




  {
    title: <HeaderCell title="참여자" />,
    dataIndex: 'nickname',
    key: 'nickname',
    width: '7%',
    render: (_: any, row: any) => (

      <div className="flex items-center justify-start ml-5">
        <button
          type="button"
          className=' hover:font-bold hover:underline'
          onClick={() => onClickUser(row.id)}
        >  
          <TableAvatar
            src={row.avatar}
            name={row.name}
            //description={row.email}
          />
        </button>
      </div>

    ),
  },
 
  // ISTJ, ISFJ, INFJ, INTJ, ISTP, ISFP, INFP, INTP, ESTP, ESFP, ENFP, ENTP, ESTJ, ESFJ, ENFJ, ENTJ
  // differnet color for each type
  {
    title: <HeaderCell title="결과" />,
    dataIndex: 'surveyResult',
    key: 'surveyResult',
    width: '15%',
    render: (value: string) => (

     

      (value === "ISTJ") ? (<div className="flex items-center justify-center gap-2">
        <PiCheckCircleFill className="text-red-500" />
        <Text className="font-medium text-red-500">{value}</Text>
      </div>) : (value === "ISFJ") ? (<div className="flex items-center justify-center gap-2">
        <PiCheckCircleFill className="text-red-500" />
        <Text className="font-medium text-red-500">{value}</Text>
      </div>) : (value === "INFJ") ? (<div className="flex items-center  justify-center gap-2">
        <PiCheckCircleFill className="text-red-500" />
        <Text className="font-medium text-red-500">{value}</Text>
      </div>) : (value === "INTJ") ? (<div className="flex items-center justify-center gap-2">
        <PiCheckCircleFill className="text-red-500" />
        <Text className="font-medium text-red-500">{value}</Text>
      </div>) : (value === "ISTP") ? (<div className="flex items-center justify-center gap-2">
        <PiCheckCircleFill className="text-blue-500" />
        <Text className="font-medium text-blue-500">{value}</Text>
      </div>) : (value === "ISFP") ? (<div className="flex items-center justify-center gap-2">
        <PiCheckCircleFill className="text-blue-500" />
        <Text className="font-medium text-blue-500">{value}</Text>
      </div>) : (value === "INFP") ? (<div className="flex items-center justify-center gap-2">
        <PiCheckCircleFill className="text-blue-500" />
        <Text className="font-medium text-blue-500">{value}</Text>
      </div>) : (value === "INTP") ? (<div className="flex items-center justify-center gap-2">
        <PiCheckCircleFill className="text-blue-500" />
        <Text className="font-medium text-blue-500">{value}</Text>
      </div>) : (value === "ESTP") ? (<div className="flex items-center justify-center gap-2">
        <PiCheckCircleFill className="text-green-500" />
        <Text className="font-medium text-green-500">{value}</Text>
      </div>) : (value === "ESFP") ? (<div className="flex items-center justify-center gap-2">
        <PiCheckCircleFill className="text-green-500" />
        <Text className="font-medium text-green-500">{value}</Text>
      </div>) : (value === "ENFP") ? (<div className="flex items-center justify-center gap-2">
        <PiCheckCircleFill className="text-green-500" />
        <Text className="font-medium text-green-500">{value}</Text>
      </div>) : (value === "ENTP") ? (<div className="flex items-center justify-center gap-2">
        <PiCheckCircleFill className="text-green-500" />
        <Text className="font-medium text-green-500">{value}</Text>
      </div>) : (value === "ESTJ") ? (<div className="flex items-center justify-center gap-2">
        <PiCheckCircleFill className="text-yellow-500" />
        <Text className="font-medium text-yellow-500">{value}</Text>
      </div>) : (value === "ESFJ") ? (<div className="flex items-center justify-center gap-2">
        <PiCheckCircleFill className="text-yellow-500" />
        <Text className="font-medium text-yellow-500">{value}</Text>
      </div>) : (value === "ENFJ") ? (<div className="flex items-center justify-center gap-2">
        <PiCheckCircleFill className="text-yellow-500" />
        <Text className="font-medium text-yellow-500">{value}</Text>
      </div>) : (value === "ENTJ") ? (<div className="flex items-center justify-center gap-2">
        <PiCheckCircleFill className="text-yellow-500" />
        <Text className="font-medium text-yellow-500">{value}</Text>
      </div>) : (<div className="flex items-center justify-center gap-2">
        <PiCheckCircleFill className="text-gray-500" />
        <Text className="font-medium text-gray-500">{value}</Text>
      </div>)

    

    ),
  },



  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: '5%',
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-4">


        
        <Tooltip
          size="sm"
          content={() => '상세보기'}
          placement="top"
          color="invert"
        >

          <Link href={"/survey/"+row.id}>
            <ActionIcon
              tag="span"
              size="sm"
              variant="outline"
              aria-label={'상세보기'}
              className="hover:text-gray-700"
            >
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        



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
