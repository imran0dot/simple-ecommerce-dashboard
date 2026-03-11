const FetchLoader = ({ title = ' Loading content...' }) => {
  return (
    /* Fixed overlay to cover the entire screen */
    <div className="fixed inset-0 z-[9999] flex flex-col justify-center items-center bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm transition-all duration-300">
      {/* Container for the spinner and text */}
      <div className="flex flex-col justify-center items-center gap-4 text-slate-800 dark:text-slate-200">
        {/* Spinner */}
        <div className="relative">
          <div className="inline-block border-2 border-info rounded-full size-8 animate-spin border-s-transparent"></div>
        </div>

        {/* Loading text */}
        <div className="flex flex-col items-center animate-pulse">
          <p className="text-lg font-bold tracking-wide">{title}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
            Please wait a moment
          </p>
        </div>
      </div>
    </div>
  );
};

export default FetchLoader;
