/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, type ReactNode } from 'react';
import Footer from '@/components/layouts/Footer';
import Sidebar from '@/components/layouts/SideNav';
import Topbar from '@/components/layouts/topbar';
import Customizer from '@/components/layouts/customizer';
import { useAuth, useUser } from '@clerk/clerk-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LuLoader } from 'react-icons/lu';
import { setupAxiosInterceptors } from '@/lib/axios';

const PageWrapper = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const { isLoaded, isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
    const { getToken } = useAuth();

  useEffect(() => {
    if (!isLoaded) return; // Wait until user is loaded

    if ((user as any)?.publicMetadata?.role !== 'admin') {
      navigate('/', { state: { from: location.pathname }, replace: true });
    }


    setupAxiosInterceptors(getToken);

    setLoading(false);
  }, [isLoaded, isSignedIn, user, navigate, location]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/40 backdrop-blur-sm z-50">
        <LuLoader className="animate-spin text-4xl text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="wrapper">
      <Sidebar />
      <div className="page-content">
        <Topbar />
        {children}
        <Footer />
      </div>
      <Customizer />
    </div>
  );
};

export default PageWrapper;
