import { memo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@store";
import { Menu, Button, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";

const ActionButtons: React.FC<{ onLogout: () => void; onLogin: () => void }> = ({ onLogout, onLogin }) => {
  const mobileView = useSelector((state: RootState) => state.app.mobileView);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const LoggedInDropdownMenu = (
    <Menu className="p-4" style={{ width: 176 }}>
      {/* <Menu.Item className="rounded font-medium" key="MyVouchers">
        <a href="/account/vouchers">My Vouchers</a>
      </Menu.Item>
      <Menu.Item className="rounded font-medium" key="MyFavourites">
        <a href="/account/followed-merchants">My Favourites</a>
      </Menu.Item>
      <Menu.Item className="rounded font-medium" key="MyReviews">
        <a href="/account/reviews">My Reviews</a>
      </Menu.Item>
      <Menu.Item className="rounded font-medium" key="MyProfile">
        <a href="/account/profile">My Profile</a>
      </Menu.Item>
      <Menu.Item className="rounded font-medium" key="Account">
        <a href="/account/profile">Account</a>
      </Menu.Item> */}
      <Menu.Item className="rounded font-medium" key="LogOut" onClick={onLogout}>
        Log out
      </Menu.Item>

      <Menu.Divider />

      <Menu.Item className="rounded font-medium" key="Help">
        Help
      </Menu.Item>
    </Menu>
  );

  const AccountButton = (
    <Button
      className="flex justify-center items-center border-0 shadow-none mr-2 p-1"
      icon={<UserOutlined />}
      onClick={isAuthenticated ? undefined : onLogin}
    >
      {!mobileView && <div className="ml-2 font-semibold text-base">{isAuthenticated ? "Account" : "Sign In"}</div>}
    </Button>
  );
  return (
    <header className="flex">
      {isAuthenticated ? (
        <Dropdown
          overlay={LoggedInDropdownMenu}
          trigger={["click"]}
          placement="bottomRight"
          getPopupContainer={(triggerNode: HTMLElement) => {
            const body = document.getElementById("_body");
            if (body) return body;
            return triggerNode;
          }}
        >
          {AccountButton}
        </Dropdown>
      ) : (
        AccountButton
      )}
    </header>
  );
};

export default memo(ActionButtons);
