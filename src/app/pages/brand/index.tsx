import BrandCreate from './components/BrandCreate';
import BrandList from './components/BrandList';
import BrandUpdate from './components/BrandUpdate';

import { useState } from 'react';

const Index = () => {
  const [page, setPage] = useState<{
    data: unknown | null;
    action: string;
  }>({
    data: null,
    action: '',
  });

  switch (page.action) {
    case 'create':
      return <BrandCreate setPage={setPage} />;
    case 'update':
      return <BrandUpdate setPage={setPage} initialData={page.data} />;
    default:
      return <BrandList setPage={setPage} />;
  }
};

export default Index;
