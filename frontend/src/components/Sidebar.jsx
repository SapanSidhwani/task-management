import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Sidebar = () => {
    const navigate = useNavigate();
  
    useEffect(() => {
        const token = Cookies.get('PHPSESSID');
        if(token === undefined) {
            navigate('/login')
        }
    });
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
