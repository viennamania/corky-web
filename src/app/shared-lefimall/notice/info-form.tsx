'use client';


import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import { SubmitHandler, Controller } from 'react-hook-form';
import { PiClock, PiEnvelopeSimple } from 'react-icons/pi';
import { Form } from '@/components/ui/form';
import { Text } from '@/components/ui/text';

import { PhoneNumber } from '@/components/ui/phone-input';

import { Input } from '@/components/ui/input';

import Spinner from '@/components/ui/spinner';
import FormGroup from '@/app/shared-lefimall/form-group';

import FormFooter from '@/components/lefimall/form-footer';


import UploadZone from '@/components/ui/file-upload/upload-zone';
import { countries, roles, timezones } from '@/data/forms/my-details';
import AvatarUpload from '@/components/ui/file-upload/avatar-upload';


import Image from 'next/image';



//import { RadioGroup } from 'rizzui';
import { RadioGroup } from '@/components/ui/radio-group';
import { Radio } from '@/components/ui/radio';



import  { useEffect, useState } from 'react';


import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';


import {
  defaultValues,
  personalInfoFormSchema,
  PersonalInfoFormTypes,
} from '@/utils/validators/personal-info.schema';


import DateCell from '@/components/ui/date-cell';


import { Checkbox } from '@/components/ui/checkbox';


const SelectBox = dynamic(() => import('@/components/ui/select'), {
  ssr: false,
  loading: () => (
    <div className="grid h-10 place-content-center">
      <Spinner />
    </div>
  ),
});

const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
});




export type DetailsTypes = {
  item: any;
};


export default function InfoForm({
  item,
}: React.PropsWithChildren<DetailsTypes>) {


  const { push } = useRouter();

  const [values, setValues] = useState<string[]>([]);
  const [value, setValue] = useState('');

  const onSubmit: SubmitHandler<PersonalInfoFormTypes> = (data) => {
    toast.success(<Text as="b">Saved!!</Text>);
    console.log('Profile settings data ->', {
      ...data,
    });

    push(routes.operation.notice);
  };





  const [content, setContent] = useState(item?.content);

  const [title, setTitle] = useState(item?.title);

  const [isTop, setIsTop] = useState(item?.isTop);

  useEffect(() => {
    if (item) {
      setTitle(item?.title);
      setContent(item?.content);
      setIsTop(item?.isTop);
    }
  } ,[ item ]);


  return (
    
    <Form<PersonalInfoFormTypes>
      validationSchema={personalInfoFormSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className='@container'
      useFormProps={{
        mode: 'onChange',
        defaultValues,
      }}
    >

      {({ register, control, setValue, getValues, formState: { errors } }) => {


        return (
          <>

            
            <div className=" grid divide-y divide-solid divide-gray-200 border rounded-lg ">

              <FormGroup
                title="NO"
                
              >
                <Text >{item?.id}</Text>
              </FormGroup>
              
              <FormGroup
                title="등록일자"
                
              >
                <Text >

                  <DateCell date={item?.createdAt} className='w-fit' />
                </Text>
              </FormGroup>

              {/* checkbox */}
              <FormGroup
                title="상단고정"
                
              >
                <div className='flex flex-row items-center justify-start gap-5'>
                  <Checkbox
                    variant="flat"
                    aria-label={'isTop'}
                    className="cursor-pointer"
                    color='primary'
                    checked={isTop}
                    onChange={(e) => {
                      console.log('onChange', e.target.checked);
                      setIsTop(() => e.target.checked);
                    } }
                  />
                  <Text>고정</Text>
                </div>
              </FormGroup>

              <FormGroup
                title="작성자"
                
              >
                <Text >{item?.name} ({item?.email})</Text>
              </FormGroup>


              <FormGroup
                title="제목"
                
              >                  
                <Input
                  //color='info'
                  size='lg'
                  value={title}
                  onChange={(e) => setTitle(() => e.target.value)}
                  //label="Company Name"
                  placeholder="제목을 입력하세요"
                  //{...register('last_name')}
                  error={''}
                />    
              </FormGroup>


              <FormGroup
                title="내용"
                
              >
                <Controller
                  
                  control={control}
                  name="bio"
                  render={({ field: { onChange, value } }) => (

                    <QuillEditor
                      
                      value={content}
                      
                      //value={item?.content}

                      //onChange={onChange}

                      //onChange={(e) => setContent(() => e.target.value)}
                      
                      className="@3xl:col-span-2 [&>.ql-container_.ql-editor]:min-h-[200px] "

                      //className="rounded-md bg-gray-0 dark:bg-gray-50 [&>.ql-container_.ql-editor]:min-h-[100px]"

                      //labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                      //label="내용"
                    />

                    
                  )}
                />
              </FormGroup>
              

            </div>



            
            <FormFooter
              // isLoading={isLoading}
              altBtnText="Cancel"
              submitBtnText="Save"

              handleSubmitBtn={() => {
                onSubmit(getValues());
              } }

              handleAltBtn={() => {
                console.log('handleAltBtn');

                //push(routes.operation.healthinfo);



                //Router.push({routes.feed});

                //Router.push('/feed');

                window.history.back();

              } }
              
            />
            

          </>
        );
      }}
    </Form>
  );
}
