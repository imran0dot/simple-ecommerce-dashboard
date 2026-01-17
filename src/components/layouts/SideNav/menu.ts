import type { IconType } from 'react-icons/lib';
import {
  LuFileText,
  LuGrid2X2,
  LuListPlus,
  LuPackage,
  LuShieldCheck,
  LuSquareUserRound,
} from 'react-icons/lu';

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

  { key: 'Products', label: 'Products', href: '/product-list', icon: LuPackage },
  { key: 'Products Grid', label: 'Products Grid', href: '/product-grid', icon: LuGrid2X2 },
  { key: 'Product Details', label: 'Product Details', href: '/product-overview', icon: LuFileText },
  { key: 'Add Products', label: 'Add Products', href: '/product-create', icon: LuListPlus },
  { key: 'Category', label: 'Category', href: '/category', icon: LuListPlus },
  { key: 'Orders', label: 'Orders', href: '/orders', icon: LuShieldCheck },
  { key: 'Order Details', label: 'Order Details', href: '/order-overview', icon: LuFileText },
  { key: 'Sellers', label: 'Sellers', href: '/sellers', icon: LuSquareUserRound },
];
