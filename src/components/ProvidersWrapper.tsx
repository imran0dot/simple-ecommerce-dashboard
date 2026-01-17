import React from 'react';
import { ClerkProvider } from '@clerk/clerk-react';

import LayoutProvider from '@/context/useLayoutContext';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
const ProvidersWrapper = ({ children }: { children: React.ReactNode }) => {
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!PUBLISHABLE_KEY) {
    throw new Error('Add your Clerk Publishable Key to the .env file');
  }
  return (
    <>
      <Provider store={store}>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <LayoutProvider>{children}</LayoutProvider>
        </ClerkProvider>
      </Provider>
    </>
  );
};

export default ProvidersWrapper;
