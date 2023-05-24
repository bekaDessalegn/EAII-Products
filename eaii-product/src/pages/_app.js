import '@/styles/globals.css'
import '@/styles/navbar.css'
import '@/styles/nprogress.css'

import { Router, useRouter } from 'next/router';
import NProgress from 'nprogress';
import { ThemeProvider } from "next-themes";
import Layout from '../../components/layout';
import { motion } from 'framer-motion';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());
NProgress.configure({ showSpinner: false });

export default function App({ Component, pageProps }) {

  const router = useRouter();

  return <ThemeProvider enableSystem={false} attribute="class">
  <Layout>
    {/* animate on page load */}
    <motion.div
      key={router.route}
      initial="initial"
      animate="animate"
      transition={{ duration: 1 }}
      variants={{
        initial: {
          opacity: 0,
          scale: 1.5,
        },
        animate: {
          opacity: 1,
          scale: 1,
        },
      }}
    >
      <Component {...pageProps} />
    </motion.div>
  </Layout>
</ThemeProvider>
}
