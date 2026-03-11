/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, type ReactNode } from 'react';
import Footer from '@/components/layouts/Footer';
import Sidebar from '@/components/layouts/SideNav';
import Topbar from '@/components/layouts/topbar';
import Customizer from '@/components/layouts/customizer';
import { useAuth, useUser } from '@clerk/clerk-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { setupAxiosInterceptors } from '@/lib/axios';
import FetchLoader from './FetchLoader';

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
    return <FetchLoader title={"Wait a moment!"} />;
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
