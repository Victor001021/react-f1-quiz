import { Outlet } from "react-router-dom";
import Header from "./Header";
import Main from "./main";

function AppLayout() {
  return (
    <div class="app">
      <Header />
      <Main>
        <Outlet />
      </Main>
    </div>
  );
}

export default AppLayout;
