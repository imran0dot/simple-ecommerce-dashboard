import { Link } from 'react-router';
import { LuArrowLeft, LuChevronRight, LuLayoutDashboard } from 'react-icons/lu';

type PageBreadcrumbProps = {
  title: string;
  subtitle?: string;
  onBack?: () => void;
};

const PageBreadcrumb = ({ onBack, title, subtitle }: PageBreadcrumbProps) => {
  return (
    <div className="flex items-center justify-between mb-6 print:hidden">
      {/* Title Section */}
      <div className="flex items-center gap-3">
        {onBack && (
          <button 
            onClick={onBack}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
          >
            <LuArrowLeft size={20} />
          </button>
        )}
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          {title}
        </h1>
      </div>

      {/* Breadcrumb Navigation */}
      <nav className="hidden md:flex items-center gap-2 text-sm bg-slate-100 dark:bg-slate-800/50 px-3 py-1.5 rounded-lg">
        <Link 
          to="/" 
          className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
        >
          <LuLayoutDashboard size={14} />
          Dashboard
        </Link>

        <LuChevronRight className="text-slate-400" size={16} />

        {subtitle && (
          <>
            <span className="text-slate-500 dark:text-slate-500 font-medium">{subtitle}</span>
            <LuChevronRight className="text-slate-400" size={16} />
          </>
        )}

        <span className="text-blue-600 dark:text-blue-400 font-semibold">
          {title}
        </span>
      </nav>
    </div>
  );
};

export default PageBreadcrumb;