import { Outlet } from "react-router-dom";

const FullPageLayout = () => {
  return (
    <div className="fullpage-layout">
      <Outlet />
    </div>
  );
};

export default FullPageLayout;
