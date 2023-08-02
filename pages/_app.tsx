import { useState, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { NextRouter, useRouter } from 'next/router';
import Head from 'next/head'
import "styles/app.less";
import { IntlProvider } from 'react-intl'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as localeTypes from '../locales/types';
import locales from '../locales'

const App = ({ Component, pageProps }: AppProps) => {
  const queryClient = new QueryClient()
  const router = useRouter();

  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   // 在页面组件加载完成后，设置 loading 状态为 false
  //   setLoading(false);
  // }, []);

  // 多语言配置
  const DefaultLocale = 'en';
  const { locale = DefaultLocale, defaultLocale, pathname }: NextRouter = router;
  const localeCopy: localeTypes.LocaleData = locales[locale];
  const messages = { ...localeCopy[pathname], ...localeCopy['share'] }

  useEffect(() => {

    const handleRouteChange = (url: any) => {
      console.log(url)
      window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
        page_path: url,
      })
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])


  // 在 loading 为 true 或者当前路由不是根路径时，不显示任何内容
  // if (loading || router.pathname !== '/') return null;

  return (
    <>
      <Head>
        <title></title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="title" content="" />
        <meta name="keywords" content="" />
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
        {/* <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                          page_path: window.location.pathname,
          });`}}
        /> */}
      </Head>
      <QueryClientProvider client={queryClient}>
        <IntlProvider
          locale={locale}
          defaultLocale={defaultLocale}
          messages={messages}
        >
          <Component {...pageProps} />
        </IntlProvider>
      </QueryClientProvider>
    </>
  )
}

export default App

