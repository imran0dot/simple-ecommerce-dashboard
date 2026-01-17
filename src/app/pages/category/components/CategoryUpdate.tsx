/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form';
// import ImageUpload from './ImageUpload';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { useUpdateCategoryMutation } from '@/redux/services/category';
import { useState, useEffect } from 'react';
import { LuLoader } from 'react-icons/lu';

type CategoryFormInputs = {
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  isLive: boolean;
};

interface CategoryUpdateProps {
  setPage: React.Dispatch<
    React.SetStateAction<{
      data: any | null;
      action: string;
    }>
  >;
  initialData: any;
}

const CategoryUpdate: React.FC<CategoryUpdateProps> = ({ setPage, initialData }) => {
  const [loading, setLoading] = useState(false);
  const [updateCategory, { error }] = useUpdateCategoryMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormInputs>({
    defaultValues: {
      name: initialData?.name || '',
      slug: initialData?.slug || '',
      description: initialData?.description || '',
      isLive: initialData?.isLive ?? true,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        slug: initialData.slug,
        description: initialData.description,
        isLive: initialData.isLive,
      });
    }
  }, [initialData, reset]);

  const onSubmit = async (data: CategoryFormInputs) => {
    setLoading(true);
    try {
      await updateCategory({
        id: initialData._id,
        ...data,
      }).unwrap();

      setPage({ data: null, action: '' });
    } catch (error) {
      console.error('Failed to update category:', error);
    } finally {
      setLoading(false);
    }
  };

  const onBack = () => {
    setPage(prev => ({ ...prev, action: '' }));
  };

  console.log( error);

  return (
    <main>
      <PageBreadcrumb title="Update Category" subtitle="Category" onBack={onBack} />
      <div className="lg:col-span-12 col-span-1">
        <div className="card">
          <div className="card-body">
            <h6 className="mb-4 card-title">Update Category: {initialData?.name}</h6>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Category Name & Slug */}
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 mb-5">
                <div>
                  <label className="inline-block mb-2 text-sm font-medium text-default-800">
                    Category Name
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    {...register('name', { required: 'Name is required' })}
                  />
                  {errors.name && <p className="text-danger text-sm">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="inline-block mb-2 text-sm font-medium text-default-800">
                    Slug
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    {...register('slug', { required: 'Slug is required' })}
                  />
                  {errors.slug && <p className="text-danger text-sm">{errors.slug.message}</p>}
                </div>
              </div>

              {/* Status (isLive) */}
              <div className="mb-5">
                <label className="inline-block mb-2 text-sm font-medium text-default-800">
                  Status
                </label>
                <select
                  className="form-input"
                  {...register('isLive', { setValueAs: v => v === 'true' })}
                >
                  <option value="true">Live / Published</option>
                  <option value="false">Hidden / Draft</option>
                </select>
              </div>

              {/* Image Upload */}
              <div className="mb-5">
                <label className="inline-block mb-2 text-sm font-medium text-default-800">
                  Category Image
                </label>
                {/* ইমেজ এডিটিং এর জন্য ইমেজ URL পাস করা যেতে পারে */}
                {/* <ImageUpload defaultImage={initialData?.imageUrl} /> */}
              </div>

              {/* Description */}
              <div className="grid grid-cols-1 gap-2 mb-5">
                <label className="font-semibold text-default-800 text-sm">Description</label>
                <textarea className="form-input" rows={4} {...register('description')}></textarea>
              </div>
              
              <div>
                  <p className="text-danger text-sm">
                    {String((error as any)?.data?.message || 'An error occurred while updating the category.')}
                  </p>
              </div>

              {/* Buttons */}
              <div className="mt-4 flex gap-2 md:justify-end">
                <button
                  type="button"
                  onClick={onBack}
                  className="bg-transparent text-default-500 btn border-0 hover:bg-default-100"
                >
                  Cancel
                </button>
                <button
                  disabled={loading}
                  type="submit"
                  className="text-white btn bg-primary disabled:bg-primary/50 hover:bg-primary-600"
                >
                  {loading && <LuLoader className="animate-spin mr-2" />}
                  Update Category
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CategoryUpdate;
