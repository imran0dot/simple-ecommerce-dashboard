import { useForm } from 'react-hook-form';
import ImageUpload from './ImageUpload';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { useCreateCategoryMutation } from '@/redux/services/category';
import { useState } from 'react';
import { LuLoader } from 'react-icons/lu';

type CategoryFormInputs = {
  name: string;
  description?: string;
  imageUrl?: string;
  isLive: boolean;
};

interface CategoryCreateProps {
  setPage: React.Dispatch<
    React.SetStateAction<{
      data: unknown | null;
      action: string;
    }>
  >;
}

const CategoryCreate: React.FC<CategoryCreateProps> = ({ setPage }) => {
  const [loading, setLoading] = useState(false);
  const [createCategory] = useCreateCategoryMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormInputs>({
    defaultValues: {
      name: '',
      description: '',
      isLive: true,
    },
  });

  const onSubmit = async (data: CategoryFormInputs) => {
    setLoading(true);

    const finalData = {
      ...data,
    };
    try {
      const response = await createCategory(finalData).unwrap();
      setPage(prev => ({ ...prev, action: '' }));
      console.log('Category created successfully:', response);
    } catch (error) {
      console.error('Failed to create category:', error);
    } finally {
      reset();
      setLoading(false);
    }
  };

  const onBack = () => {
    setPage({ data: null, action: '' });
  };

  return (
    <main>
      <PageBreadcrumb title="Create Category" subtitle="Category" onBack={onBack} />
      <div className="lg:col-span-12 col-span-1">
        <div className="card">
          <div className="card-body">
            <h6 className="mb-4 card-title">Create New Category</h6>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Category Name */}
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 mb-5">
                <div>
                  <label className="inline-block mb-2 text-sm font-medium text-default-800">
                    Category Name
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Electronics"
                    {...register('name', { required: 'Name is required' })}
                  />
                  {errors.name && <p className="text-danger text-sm">{errors.name.message}</p>}
                </div>
              </div>

              {/* Status (isLive) */}
              <div className="mb-5">
                <label className="inline-block mb-2 text-sm font-medium text-default-800">
                  Status
                </label>
                <select
                  className="form-input"
                  {...register('isLive', { setValueAs: value => value === 'true' })}
                >
                  <option value="true">Live / Published</option>
                  <option value="false">Hidden / Draft</option>
                </select>
                  {errors.isLive && <p className="text-danger text-sm">{errors.isLive.message}</p>}
              </div>

              {/* Image Upload */}
              <div className="mb-5">
                <label className="inline-block mb-2 text-sm font-medium text-default-800">
                  Category Image
                </label>
                <ImageUpload />
              </div>

              {/* Description */}
              <div className="grid grid-cols-1 gap-2 mb-5">
                <label className="font-semibold text-default-800 text-sm">Description</label>
                <textarea
                  className="form-input"
                  placeholder="Briefly describe this category"
                  rows={4}
                  {...register('description')}
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="mt-4 flex gap-2 md:justify-end">
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => reset()}
                  className="bg-transparent text-danger btn border-0 hover:bg-danger/15"
                >
                  Reset
                </button>
                <button
                  disabled={loading}
                  type="submit"
                  className="text-white btn bg-primary disabled:bg-primary/50 hover:bg-primary/10"
                >
                  {loading && <LuLoader className="animate-spin" />}
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CategoryCreate;
