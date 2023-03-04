import React, {FC} from "react";
import { Header } from ".";

const Layout:FC<{children: React.ReactNode}> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
}


export default Layout