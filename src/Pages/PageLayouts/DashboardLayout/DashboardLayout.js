import { Outlet } from "react-router-dom";
import Drawer from "../../Shared/Drawer/Drawer";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen">
      <Drawer />
      {/* <Outlet /> */}
    </div>
  );
}
