import '../styles/globals.scss';
import Layout from '../components/main/Layout/Layout';
import { StoreProvider } from '../utils/store';

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  );
}

export default MyApp;
