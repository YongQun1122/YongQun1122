/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { AppProps } from "next/app";
import { Provider, useDispatch } from "react-redux";
import NProgress from "nprogress";
import { useMediaQuery } from "react-responsive";
import { store } from "@store";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@lib/apollo";
import AuthTimer from "@components/App/AuthTimer";
import { Dispatcher } from "@reducers";

import "../styles/tailwind.scss";
import "antd/dist/antd.less";
import "nprogress/nprogress.css";
import "../styles/index.scss";

require("@lib/axios");

// const hasWindow = typeof window !== "undefined";

NProgress.configure({
  minimum: 0.3,
  easing: "ease",
  speed: 800,
  showSpinner: false
});

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      NProgress.start();
    };
    const handleStop = () => {
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    <>
      <Provider store={store}>
        <ApolloProvider client={apolloClient}>
          <Head>
            <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
          </Head>
          <AuthTimer />
          <ViewPort />
          <Component {...pageProps} />
        </ApolloProvider>
      </Provider>
    </>
  );
}

const ViewPort = () => {
  const dispatch = useDispatch<Dispatcher>();
  const isMobile = useMediaQuery({ query: "(max-width: 639px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    dispatch({ type: "app/SET_MOBILE_VIEW", payload: isMobile });
    dispatch({ type: "app/SET_TABLET_VIEW", payload: isTablet });
  }, []);

  useEffect(() => {
    dispatch({ type: "app/SET_MOBILE_VIEW", payload: isMobile });
    dispatch({ type: "app/SET_TABLET_VIEW", payload: isTablet });
  }, [isMobile, isTablet]);
  return null;
};
