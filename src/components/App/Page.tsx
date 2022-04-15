import { memo, useEffect, useState } from "react";
import { BackTop } from "antd";
import Head from "next/head";
import Header from "./Header/Header";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import { RootState } from "@store";
import router from "next/router";
import NotFound from "@components/App/NotFound";

interface Props {
  headTitle?: string;
  banner?: React.ReactNode;
  header?: boolean;
  footer?: boolean;
  fixedNavigation?: boolean;
  style?: React.CSSProperties;
  className?: React.HTMLAttributes<any>["className"];
  auth?: boolean;
  notFound?: boolean;
}

const Page: React.FunctionComponent<Props> = ({ children, ...props }) => {
  const { style, className, headTitle, banner, header, footer, auth } = props;
  const [backTopVisibilityHeight, setBackTopVisibilityHeight] = useState(400);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const bodyEl = document.getElementById("_body");
    if (bodyEl) setBackTopVisibilityHeight(bodyEl.offsetHeight);
  }, []);

  useEffect(() => {
    if (user && user.completed === false) router.push("/auth/complete-profile");
  }, [user]);

  if (auth && !isAuthenticated) return null;
  return (
    <>
      <Head>
        <title>
          {headTitle}
          {headTitle && " · "}
          {process.env.NEXT_PUBLIC_APP_NAME}
        </title>
      </Head>

      <main id="_body" className={`${className} relative flex flex-col h-screen w-screen`} style={{ ...style, overflow: "overlay" }}>
        {header && <Header />}
        {banner}
        <Body>{props.notFound ? <NotFound /> : children}</Body>
        {footer && <Footer />}

        <BackTop
          style={{ bottom: 80 }}
          visibilityHeight={backTopVisibilityHeight}
          target={() => {
            const el = document.getElementById("_body");
            if (el) return el;
            return window;
          }}
        />
      </main>
    </>
  );
};

const Section: React.FC<any> = ({ children }) => {
  return (
    <section className="flex-1 relative">
      <div className="relative" style={{ minHeight: "calc(100vh - 150px)" }}>
        {children}
      </div>
    </section>
  );
};
const Body = memo(Section);

Page.defaultProps = {
  header: true,
  footer: true
};

export default Page;
