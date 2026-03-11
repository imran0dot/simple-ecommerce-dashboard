export type BrandFormInputs = {
  name: string;
  slug: string;
  isLive?: boolean;
  description?: string;
  imageUrl?: string;
};

export type BrandCreateProps = {
  setPage: React.Dispatch<
    React.SetStateAction<{
      data: unknown | null;
      action: string;
    }>
  >;
};
