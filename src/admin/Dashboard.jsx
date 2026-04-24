
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Dashboard = () => {
  const [showFilter, setShowFilter] = useState(false);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6  pt-20 sm:p-4 md:p-4 lg:p-4">

      <div className='md:hidden sm:hidden flex justify-end mb-5 p-4'>
        {
          showFilter ? (
            <X onClick={() => setShowFilter(false)} />
          ) : (
            <Menu onClick={() => setShowFilter(true)} />
          )
        }
      </div>


      <div
        className={`
       ${showFilter ? "block" : "hidden"} md:block sm:col-span-1 md:col-span-1 lg:col-span-2 mt-20 md:sticky md:top-20 md:h-[calc(100vh-80px)] md:overflow-y-auto rounded-xl p-4`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="sm:pt-24 md:pt-24 lg:pt-24 p-4 sm:col-span-3 md:col-span-3 lg:col-span-4">
        <Outlet />
      </div>

    </div>
  );
};

export default Dashboard;
