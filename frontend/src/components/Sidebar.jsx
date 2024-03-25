import { Link } from 'react-router-dom';

export const Sidebar = () => {
    return (
        <aside id="sidebar" className="sidebar">
            <ul className="sidebar-nav" id="sidebar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/">
                        <i className="bi bi-person-circle"></i>
                        <span>Users</span>
                    </Link>
                </li>
            </ul>
        </aside>
    )
}
