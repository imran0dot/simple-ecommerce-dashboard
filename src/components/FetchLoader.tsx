import { LuLoader } from 'react-icons/lu';

const FetchLoader = () => {
  return (
    <div className="min-h-[50vh] flex justify-center items-center animate-pulse">
      <LuLoader className="animate-spin text-4xl text-primary" />
      <p className="text-lg font-bold pl-3">Loading...</p>
    </div>
  );
};

export default FetchLoader;
