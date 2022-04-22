import Page from "@components/App/Page";
import axios from "axios";
import router from "next/router";
import React from "react";
import Styles from "./components/todo.module.scss";
//import { Button } from "antd";
// import Editor from "./components/app";
// import SortableTable from "./components/sorting";

const index = () => {
  let userId;
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const signUp = async () => {
    try {
      await axios.post("http://localhost:3000/usertodo/signup", {
        email: email,
        password: password
      });
      alert("Sign Up successfully");
    } catch (error) {
      alert("User already exists");
    }
    setEmail("");
    setPassword("");
  };

  const signIn = async () => {
    try {
      const res = await axios.post("http://localhost:3000/usertodo/signin", {
        email: email,
        password: password
      });
      if (res) {
        userId = res.data.id;
        router.push({
          pathname: "/todo",
          query: {
            userId
          }
        });
      }
    } catch (error) {
      alert("Invalid User");
    }
  };

  return (
    <Page>
      <body className={Styles.body}>
        <div className={Styles.signWrapper}>
          <span>
            Email :<br />
            <input type="text" className={Styles.emailField} onChange={e => setEmail(e.target.value)} value={email} placeholder="email..." />
            <br />
            Password :<br />
            <input
              type="password"
              className={Styles.passwordField}
              onChange={e => setPassword(e.target.value)}
              value={password}
              placeholder="password..."
            />
            <br />
            <button className={Styles.btnSignIn} onClick={signIn}>
              SIGN IN
            </button>
            <br />
            <button className={Styles.btnSignUp} onClick={signUp}>
              SIGN UP
            </button>
          </span>
        </div>
      </body>
    </Page>
  );
};

// export const getServerSideProps: GetServerSideProps = async (_context): Promise<{ props: Props }> => {
//   try {
//     const home = await apolloClient.query<Gql.GetCurrentHomeBannerQuery>({ query: Gql.GetCurrentHomeBannerDocument });
//     const ads = await apolloClient.query<Gql.GetCurrentAdsBannerQuery>({ query: Gql.GetCurrentAdsBannerDocument });
//     return {
//       props: {
//         homeBanner: home.data.getCurrentHomeBanner,
//         adsBanner: ads.data.getCurrentAdsBanner
//       }
//     };
//   } catch (e) {
//     return { props: {} };
//   }
// };

export default index;
