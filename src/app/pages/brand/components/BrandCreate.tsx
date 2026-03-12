import { useForm } from 'react-hook-form';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { useState } from 'react';
import { LuLoader } from 'react-icons/lu';
import type { BrandCreateProps, BrandFormInputs } from './type';
import { slugify } from '@/utils/slugify';
import { useCreateMutation } from '@/redux/services/brand';
import { toast } from 'sonner';
import UploadImageModal from '@/components/modal/UploadImage';

const CategoryCreate: React.FC<BrandCreateProps> = ({ setPage }) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string>('');
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
      name: '',
      description: '',
      isLive: true,
      imageUrl: '',
      slug: '',
    },
  });

  const onBack = () => {
    setPage({ data: null, action: '' });
  };

  const onConfirmSelection = () => {
    setIsImageModal(false);
  };

  const onCancelImageModal = () => {
    setIsImageModal(false);
    setImage('');
  };

  // Slug Generate
  const handleSlugify = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const slug = slugify(value);
    setValue('slug', slug, { shouldValidate: true });
  };

  const onSubmit = async (data: BrandFormInputs) => {
    setLoading(true);
    try {
      const finalData = {
        ...data,
        imageUrl: image,
      };

      const response = await createBrand(finalData).unwrap();
      if (response.data.createdAt) {
        setPage(prev => ({ ...prev, action: '' }));
        toast.success('Success!');
      }
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
                <select className="form-input" {...register('isLive')}>
                  <option value="true">Live / Published</option>
                  <option value="false">Hidden / Draft</option>
                </select>
                {errors.isLive && <p className="text-danger text-sm">{errors.isLive.message}</p>}
              </div>

              {/* Select Brand Image */}
              <div className="mb-5">
                <label className="inline-block mb-2 text-sm font-medium text-default-800">
                  Thumbnail
                </label>
                <div className="relative group w-72 h-72">
                  <div className="relative h-full w-full overflow-hidden transition-all duration-300 ease-in-out border-2 border-dashed rounded-3xl bg-slate-50 dark:bg-slate-900 border-slate-300 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/20">
                    {image ? (
                      <div className="relative h-full w-full">
                        {/* Main Image */}
                        <img
                          src={image}
                          alt="Preview"
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Glossy Overlay on Hover */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 bg-black/20 dark:bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100">
                          <button
                            onClick={() => setImage('')}
                            className="px-4 py-2 text-sm font-semibold text-white transition-transform duration-200 bg-red-500/80 rounded-full hover:bg-red-600 hover:scale-110 shadow-lg backdrop-blur-md"
                          >
                            Remove Photo
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Empty State / Upload Trigger */
                      <button
                        type="button"
                        onClick={() => setIsImageModal(true)}
                        className="flex flex-col items-center justify-center w-full h-full space-y-4 group/btn"
                      >
                        <div className="flex items-center justify-center w-16 h-16 transition-all duration-300 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover/btn:bg-blue-500 group-hover/btn:text-white group-hover/btn:scale-110 shadow-inner">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-8 h-8"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 4.5v15m7.5-7.5h-15"
                            />
                          </svg>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-semibold text-slate-600 dark:text-slate-200">
                            Upload Image
                          </p>
                          <p className="text-xs text-slate-400 dark:text-slate-500">
                            JPG, PNG up to 5MB
                          </p>
                        </div>
                      </button>
                    )}
                  </div>
                </div>
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

      <UploadImageModal
        isOpen={isImageModal}
        onConfirm={onConfirmSelection}
        onCancel={onCancelImageModal}
        isLoading={false}
        selectionMode={'single'}
        onSelectionChange={images => {
          if (images && images.length > 0) {
            setImage(images[0]);
          }
        }}
        title="Select Media"
        size="lg"
      />
    </main>
  );
};

export default CategoryCreate;
