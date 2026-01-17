import CategoryCreate from './components/CategoryCreate';
import CategoryList from './components/CategoryList';
import { useState } from 'react';
import CategoryUpdate from './components/CategoryUpdate';

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
      return <CategoryCreate setPage={setPage} />;
      case 'update':
      return <CategoryUpdate setPage={setPage} initialData={page.data} />;
    default:
      return <CategoryList setPage={setPage} />;
  }
};

export default Index;
