import React from "react";
import { ConnectWallet } from "../../connector/containers";
import MenuLinksComponents from "components/menu-components";

const HomePage = () => {
  return (
    <>
      <div>
        <h1 className="heading-design mt-5">
          {" "}
          Welcome to{" "}
          <span className="design-heading_sub"> Connect Wallet </span>{" "}
        </h1>
        <div className="d-flex align-items-center justify-content-between mt-4 p-3 bg-black">
          <div className="">
            <MenuLinksComponents />
          </div>
          <ConnectWallet />
        </div>
      </div>
    </>
  );
};

export default HomePage;
