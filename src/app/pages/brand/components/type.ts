/* eslint-disable @typescript-eslint/no-explicit-any */
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

export interface PaginationMeta {
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
}

export interface BrandListProps {
  setPage: React.Dispatch<
    React.SetStateAction<{
      data: any | null;
      action: string;
    }>
  >;
}
