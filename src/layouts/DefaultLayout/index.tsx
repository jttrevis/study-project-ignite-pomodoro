
import { Outlet } from "react-router-dom";

import { LayoutContainer } from "./styles";
import { Header } from "../../components/Header/Header";
export const DefaultLayout = () => {
  return (
    <LayoutContainer>
      <Header />
      <Outlet />
    </LayoutContainer>
  );
};
