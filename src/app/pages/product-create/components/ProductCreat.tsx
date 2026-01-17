import { useForm } from 'react-hook-form';
import ImageUpload from './ImageUpload';

type ProductFormInputs = {
  title: string;
  code?: string;
  quantity: number;
  sku: string;
  brand: string;
  category: string;
  type: string;
  gender: string;
  colors?: string[];
  sizes?: string[];
  description?: string;
  price: number;
  discounts?: number;
  tax: string;
  publishDate?: string;
  status: string;
  visibility: string;
  // If your ImageUpload component returns a File[] or URL[], you can extend here
  images?: File[] | string[];
};

const ProductCreate = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormInputs>({
    defaultValues: {
      title: 'Test Product',
      code: 'TWT145015',
      quantity: 1,
      sku: '',
      brand: '',
      category: 'Beauty, Health, Grocery',
      type: 'Single',
      gender: 'Unisex',
      colors: [],
      sizes: [],
      description: '',
      price: 0,
      discounts: 0,
      tax: 'none',
      status: 'Draft',
      visibility: 'Public',
      images: [],
    },
  });


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: ProductFormInputs) => {
    console.log('Form Data:', data);
    // You can send this data to your backend API
  };

  return (
    <div className="lg:col-span-12 col-span-1">
      <div className="card">
        <div className="card-body">
          <h6 className="mb-4 card-title">Create Product</h6>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Product Title & Code */}
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 mb-5">
              <div>
                <label className="inline-block mb-2 text-sm font-medium text-default-800">
                  Product Title
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Product Title"
                  {...register('title', {
                    required: 'Product title is required',
                    maxLength: { value: 20, message: 'Max 20 characters' },
                  })}
                />
                {errors.title && <p className="text-danger text-sm">{errors.title.message}</p>}
              </div>

              <div>
                <label className="inline-block mb-2 text-sm font-medium text-default-800">
                  Product Code
                </label>
                <input
                  type="text"
                  className="form-input"
                  value="TWT145015"
                  disabled
                  {...register('code')}
                />
                <p className="mt-1 text-default-400">Code will be generated automatically</p>
              </div>
            </div>
            {/* Quantity, SKU, Brand */}
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-5 mb-5">
              <div>
                <label className="inline-block mb-2 text-sm font-medium text-default-800">
                  Quantity
                </label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="Quantity"
                  {...register('quantity', { required: true, min: 1 })}
                />
                {errors.quantity && <p className="text-danger text-sm">Quantity is required</p>}
              </div>

              <div>
                <label className="inline-block mb-2 text-sm font-medium text-default-800">
                  SKU
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="TWT-LP-ALU-08"
                  {...register('sku', { required: true })}
                />
              </div>

              <div>
                <label className="inline-block mb-2 text-sm font-medium text-default-800">
                  Brand
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Brand"
                  {...register('brand', { required: true })}
                />
              </div>

              {/* Category */}
              <div>
                <label className="inline-block mb-2 text-sm font-medium text-default-800">
                  Category
                </label>
                <select className="form-input" {...register('category')}>
                  <option>Beauty, Health, Grocery</option>
                  <option>Books</option>
                  <option>Home, Kitchen, Pets</option>
                  <option>Men's Fashion</option>
                  <option>Mobile, Computers</option>
                  <option>TV, Appliances, Electronics</option>
                  <option>Women's Fashion</option>
                </select>
              </div>

              {/* Product Type */}
              <div>
                <label className="inline-block mb-2 text-sm font-medium text-default-800">
                  Product Type
                </label>
                <select className="form-input" {...register('type')}>
                  <option value={'simple'}>Simple Product</option>
                  <option value={'variation'}>Variation Product</option>
                </select>
              </div>
            </div>
            <ImageUpload />

            {/* Description */}
            <div className="grid grid-cols-1 gap-2 mb-5">
              <h6 className="font-semibold text-default-800 text-sm">Description</h6>
              <textarea
                className="form-input"
                placeholder="Enter Description"
                rows={5}
                {...register('description')}
              ></textarea>
            </div>

            {/* Price, Discounts, Tax, etc. */}
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-5 mb-5">
              <div>
                <label className="inline-block mb-2 text-sm font-medium text-default-800">
                  Price
                </label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="$0.00"
                  {...register('price', { required: true, min: 0 })}
                />
              </div>

              <div>
                <label className="inline-block mb-2 text-sm font-medium text-default-800">
                  Discounts price
                </label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="0 tk"
                  {...register('discounts')}
                />
              </div>

              <div>
                <label className="inline-block mb-2 text-sm font-medium text-default-800">
                  Status
                </label>
                <select className="form-input" {...register('status')}>
                  <option>Draft</option>
                  <option>Entertainment</option>
                  <option>Published</option>
                  <option>Scheduled</option>
                </select>
              </div>

              <div>
                <label className="inline-block mb-2 text-sm font-medium text-default-800">
                  Visibility
                </label>
                <select className="form-input" {...register('visibility')}>
                  <option>Hidden</option>
                  <option>Public</option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-4 flex gap-2 md:justify-end">
              <button
                type="button"
                onClick={() => reset()}
                className="bg-transparent text-danger btn border-0 hover:bg-danger/15"
              >
                Reset
              </button>
              <button type="submit" className="text-white btn bg-primary">
                Create Product
              </button>
              <button type="button" className="bg-teal-600 text-white btn hover:bg-teal-700">
                Draft & Preview
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
