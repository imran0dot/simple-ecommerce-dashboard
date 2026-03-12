import { Link } from 'react-router';
import SimplebarClient from '@/components/client-wrapper/SimplebarClient';
import AppMenu from './AppMenu';
import HoverToggle from './HoverToggle';
import logo from '../../../assets/images/covers_logo.png';

const Sidebar = () => {
  return (
    <aside id="app-menu" className="app-menu">
      <div className="flex items-center justify-between h-16 px-4 border-b border-slate-100 dark:border-slate-800">
        <Link to="/" className="flex items-center gap-3 overflow-hidden">
          <img src={logo} alt="Logo" className="h-8 w-8 border border-slate-300 rounded object-contain shrink-0" />
          <div className="flex flex-col truncate">
            <span className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider">
              Dashboard
            </span>
            <span className="text-[10px] text-slate-400 font-medium">ADMIN PANEL</span>
          </div>
        </Link>
        <HoverToggle />
      </div>

      <HoverToggle />

      <div className="relative min-h-0 flex-grow">
        <SimplebarClient className="size-full">
          <AppMenu />
        </SimplebarClient>
      </div>
    </aside>
  );
};

export default Sidebar;
