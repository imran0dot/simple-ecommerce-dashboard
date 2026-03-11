import { useForm } from 'react-hook-form';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { useState } from 'react';
import { LuLoader } from 'react-icons/lu';
import Modal from '@/components/modal';
import MediaSelect from '@/components/Media/MediaSelect';
import type { BrandCreateProps, BrandFormInputs } from './type';
import { slugify } from '@/utils/slugify';
import { useCreateMutation } from '@/redux/services/brand';
import { toast } from 'sonner';

const CategoryCreate: React.FC<BrandCreateProps> = ({ setPage }) => {
  const [loading, setLoading] = useState(false);
  const [isImageModal, setIsImageModal] = useState(false);
  const [createBrand] = useCreateMutation();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<BrandFormInputs>({
    defaultValues: {
      name: 'test',
      description: 'test',
      isLive: true,
      imageUrl: '',
      slug: 'test',
    },
  });

  const onBack = () => {
    setPage({ data: null, action: '' });
  };

  // Slug Generate
  const handleSlugify = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const slug = slugify(value);
    setValue('slug', slug, { shouldValidate: true });
  };

  const onSubmit = async (data: BrandFormInputs) => {
    setLoading(true);
    console.log('===========Set Loading true');
    try {
      console.log('===========Sending to API');
      const response = await createBrand(data).unwrap();
      console.log('=========== Response');
      console.log(response);
      console.log('=========== Go Back Page');
      setPage(prev => ({ ...prev, action: '' }));
      toast.success('Success!');
    } catch (error) {
      toast.error('Error!');
      console.error('Failed to create category:', error);
    } finally {
      setTimeout(() => {
        reset();
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <main>
      <PageBreadcrumb title="Create Brand" subtitle="Brand" onBack={onBack} />
      <div className="lg:col-span-12 col-span-1">
        <div className="card">
          <div className="card-body">
            <h6 className="mb-4 card-title">Create New Brand</h6>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Category Name */}
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 mb-5">
                <div>
                  <label className="inline-block mb-2 text-sm font-medium text-default-800">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Electronics"
                    {...register('name', {
                      required: 'Name is required',
                      onBlur: e => handleSlugify(e),
                    })}
                  />
                  {errors.name && <p className="text-danger text-sm">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="inline-block mb-2 text-sm font-medium text-default-800">
                    Slug
                  </label>
                  <input
                    type="text"
                    className="disabled:bg-slate-200! form-input"
                    placeholder="Auto Generated Slug"
                    disabled
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
                  {...register('isLive', { setValueAs: value => value === 'true' })}
                >
                  <option value="true">Live / Published</option>
                  <option value="false">Hidden / Draft</option>
                </select>
                {errors.isLive && <p className="text-danger text-sm">{errors.isLive.message}</p>}
              </div>

              {/* Description */}
              <div className="grid grid-cols-1 gap-2 mb-5">
                <label className="font-semibold text-default-800 text-sm">Description</label>
                <textarea
                  className="form-input"
                  placeholder="Briefly describe this brand"
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
