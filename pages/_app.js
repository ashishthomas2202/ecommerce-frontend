import '../styles/globals.scss';
import { SessionProvider } from 'next-auth/react';
import Layout from '../components/main/Layout/Layout';
import { StoreProvider } from '../utils/store';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <StoreProvider>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </StoreProvider>
  );
}

export default MyApp;
