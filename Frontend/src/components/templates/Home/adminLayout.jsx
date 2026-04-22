import { Outlet } from "react-router-dom";
import { useState } from "react";

import Sidebar from "../../organisms/Home/SideBar";

export default function AdminLayout() {

    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (

        <div className="d-flex">

        <Sidebar
            collapsed={collapsed}
            toggleSidebar={toggleSidebar}
        />

        <main
            className="flex-grow-1 p-4 main-content-wrapper"
            style={{
            transition: "margin-left 0.3s"
            }}
        >

            <Outlet />

        </main>

        </div>

    );

}