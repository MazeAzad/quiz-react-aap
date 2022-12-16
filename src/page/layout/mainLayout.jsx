import { NavLink, Outlet } from "react-router-dom";
const MainLayout = () => {
    return (
        <div className="mainContainer">
            <nav className="navbar">
                <h3>quiz</h3>
            </nav>
            <Outlet />
        </div>
    )
}

export default MainLayout;