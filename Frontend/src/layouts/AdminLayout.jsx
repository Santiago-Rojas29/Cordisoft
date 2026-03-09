import Navbar from "../components/organisms/Sidebar"
import Header from "../components/organisms/Header"
import { Outlet } from "react-router-dom"

export default function AdminLayout() {
    return (
        <div className="d-flex vh-100">
        <Navbar />

        <div className="flex-grow-1">
            <Header />
        <div className="p-4">
            <Outlet />
        </div>
        </div>
    </div>
    )
}
