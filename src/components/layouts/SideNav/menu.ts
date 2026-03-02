import type { IconType } from 'react-icons/lib';
import { LuGrid2X2, LuImage, LuListPlus, LuPackage, LuShieldCheck } from 'react-icons/lu';

export type MenuItemType = {
  key: string;
  label: string;
  isTitle?: boolean;
  href?: string;
  children?: MenuItemType[];

  icon?: IconType;
  parentKey?: string;
  target?: string;
  isDisabled?: boolean;
};

export const menuItemsData: MenuItemType[] = [
  {
    key: 'Overview',
    label: 'Overview',
    isTitle: true,
  },

  { key: 'Orders', label: 'Orders', href: '/orders', icon: LuShieldCheck },
  {
    key: 'Products',
    label: 'Products',
    href: '/product-list',
    icon: LuPackage,
    children: [
      { key: 'productList', label: 'Products Grid', href: '/product-grid', icon: LuGrid2X2 },
      { key: 'newProducts', label: 'Add Products', href: '/product-create', icon: LuListPlus },
    ],
  },
  {
    key: 'Category',
    label: 'Category',
    href: '/category',
    icon: LuListPlus,
  },
  { key: 'Media', label: 'Media', href: '/media', icon: LuImage },
];
