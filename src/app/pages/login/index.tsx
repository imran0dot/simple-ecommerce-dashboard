import { SignedIn, SignedOut, SignIn, SignOutButton, useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useUser();

  console.log('Location State:', location);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((user.user as any)?.publicMetadata?.role === 'admin') {
      const previousPath = location.state?.from || '/dashboard';
      navigate(previousPath, { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="flex w-full border min-h-screen items-center justify-center ">
      <SignedOut>
        <SignIn />
      </SignedOut>
      <SignedIn>
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-semibold">You are already signed in,</h2>
          <p className='mb-5'>But You're not allowed to login to the dashboard</p>
          <SignOutButton>
            <button className="px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700">
              Sign Out
            </button>
          </SignOutButton>
        </div>
      </SignedIn>
    </div>
  );
};

export default Index;
