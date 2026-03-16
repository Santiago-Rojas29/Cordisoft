import { Outlet } from "react-router-dom";
import { useState } from "react";

import InstructorSidebar from "../../organisms/Home/instructorSideBar";

export default function InstructorLayout() {

    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (

        <div className="d-flex">

        <InstructorSidebar
            collapsed={collapsed}
            toggleSidebar={toggleSidebar}
        />

        <main
            className="flex-grow-1 p-4"
            style={{
            transition: "margin-left 0.3s"
            }}
        >

            <Outlet />

        </main>

        </div>

    );

}