/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { useUpdateMutation } from '@/redux/services/brand';
import { useState, useEffect } from 'react';
import { LuLoader } from 'react-icons/lu';
import UploadImageModal from '@/components/modal/UploadImage';

type BrandFormInputs = {
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  isLive: boolean;
};

interface BrandUpdateProps {
  setPage: React.Dispatch<
    React.SetStateAction<{
      data: any | null;
      action: string;
    }>
  >;
  initialData: any;
}

const BrandUpdate: React.FC<BrandUpdateProps> = ({ setPage, initialData }) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string>('');
  const [isImageModal, setIsImageModal] = useState(false);
  const [updateBrand, { error }] = useUpdateMutation() as any;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BrandFormInputs>({
    defaultValues: {
      name: initialData?.name || '',
      slug: initialData?.slug || '',
      description: initialData?.description || '',
      imageUrl: initialData?.imageUrl || '',
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
        imageUrl: initialData?.imageUrl || '',
      });

      setImage(initialData?.imageUrl || '');
    }
  }, [initialData, reset]);

  const onConfirmSelection = () => {
    setIsImageModal(false);
  };

  const onCancelImageModal = () => {
    setIsImageModal(false);
    setImage('');
  };

  const onSubmit = async (data: BrandFormInputs) => {
    setLoading(true);

    try {
      await updateBrand({
        id: initialData._id,
        ...data,
        imageUrl: image,
      }).unwrap();

      setPage({ data: null, action: '' });
    } catch (error) {
      console.error('============== UPDATE FAILED:', error);
    } finally {
      setLoading(false);
    }
  };

  const onBack = () => {
    setPage(prev => ({ ...prev, action: '' }));
  };

  return (
    <main>
      <PageBreadcrumb title="Update Brand" subtitle="Brand" onBack={onBack} />
      <div className="lg:col-span-12 col-span-1">
        <div className="card">
          <div className="card-body">
            <h6 className="mb-4 card-title">Update Brand: {initialData?.name}</h6>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Brand Name & Slug */}
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 mb-5">
                <div>
                  <label className="inline-block mb-2 text-sm font-medium text-default-800">
                    Brand Name
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

              {/* Status (isLive) - FIXED WITH setValueAs */}
              <div className="mb-5">
                <label className="inline-block mb-2 text-sm font-medium text-default-800">
                  Status
                </label>
                <select
                  className="form-input"
                  {...register('isLive', {
                    setValueAs: v => v === 'true',
                  })}
                >
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
                        <img
                          src={image}
                          alt="Preview"
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 bg-black/20 dark:bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100">
                          <button
                            type="button"
                            onClick={() => setImage('')}
                            className="px-4 py-2 text-sm font-semibold text-white transition-transform duration-200 bg-red-500/80 rounded-full hover:bg-red-600 hover:scale-110 shadow-lg backdrop-blur-md"
                          >
                            Remove Photo
                          </button>
                        </div>
                      </div>
                    ) : (
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
                <textarea className="form-input" rows={4} {...register('description')}></textarea>
              </div>

              {/* Error Message Display */}
              {error && (
                <div>
                  <p className="text-danger text-sm mb-4">
                    {String(
                      (error as { data?: { message?: string } })?.data?.message ||
                        'An error occurred while updating the Brand.'
                    )}
                  </p>
                </div>
              )}

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
                  Update Brand
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

export default BrandUpdate;
