import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";
import { requestLogout } from "@actions/auth.actions";
import { RootState } from "@store";
import { Dispatcher } from "@reducers";
import { printErrorMessage } from "@utils";
import ActionButtons from "./ActionButtons";
import { MenuOutlined } from "@ant-design/icons";

interface HeaderProps {
  className?: string;
  style?: React.CSSProperties;
}

const Header: React.FunctionComponent<HeaderProps> = props => {
  const mobileView = useSelector((state: RootState) => state.app.mobileView);
  const dispatch = useDispatch<Dispatcher>();

  const onLogin = () => {
    console.log("on click login");
    // router.push("/auth/login");
  };

  const onLogout = async () => {
    try {
      await requestLogout()(dispatch);
      // router.push("/auth/login");
    } catch (e) {
      printErrorMessage(e);
    }
  };

  const onOpenDrawer = () => {
    dispatch({ type: "app/SET_ACCOUNT_DRAWER_VISIBLE", payload: true });
  };

  return (
    <header className={`Header justify-center ${props.className || ""}`} style={{ ...props.style, top: 0, zIndex: 1001 }}>
      <div
        className="flex justify-center items-center border w-full px-5"
        style={{ height: mobileView ? 50 : 60, boxShadow: "0px 1px 0px rgba(0, 0, 0, 0.08)" }}
      >
        {/* <div className="content-width px-2 flex-1 w-full border"> */}
        <div className="flex justify-between items-center flex-1  w-full h-full" style={{ maxWidth: "100vw" }}>
          <div className="flex-center">
            {mobileView && (
              <Button className="flex justify-center items-center border-0 shadow-none mx-2 p-1" onClick={onOpenDrawer} icon={<MenuOutlined />} />
            )}

            <div className="ml-3 cursor-pointer">
              <Link href="/">
                <div className="flex items-center">
                  <div className="flex-center">
                    {!mobileView && (
                      <Image alt="logo" className="p-1 rounded-full" height={38} width={38} src="/favicon/android-chrome-192x192.png" />
                    )}
                  </div>
                  <div className="ml-2 font-medium">Next.JS</div>
                </div>
              </Link>
            </div>
          </div>

          <ActionButtons onLogin={onLogin} onLogout={onLogout} />
        </div>
      </div>
      {/* </div> */}
    </header>
  );
};

export default memo(Header);
