
import Dashboard from '@/app/shared-lefimall/dashboard';


import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Files'),
};

export default function File() {
  return <Dashboard />;
}
