import Page from "@components/App/Page";
//import { Button } from "antd";
import TodoWrapper from "./components/todo";
// import Editor from "./components/app";
// import SortableTable from "./components/sorting";

const HomePage: React.FC<any> = () => {
  return (
    <Page>
      <TodoWrapper></TodoWrapper>
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

export default HomePage;
