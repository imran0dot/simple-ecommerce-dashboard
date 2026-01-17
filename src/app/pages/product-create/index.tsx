import PageBreadcrumb from '@/components/PageBreadcrumb';
import ProductCreat from './components/ProductCreat';


const Index = () => {
  return (
    <>
      <main>
        <PageBreadcrumb title="Add New" subtitle="Menu" />
        <div className="grid lg:grid-cols-12 grid-cols-1 gap-6">
          <ProductCreat />
        </div>
      </main>
    </>
  );
};

export default Index;
