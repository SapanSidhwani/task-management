import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useSelectedUser from '../store/useSelectedUser';

export const HomePage = () => {

    const [users, setUsers] = useState([]);
    const { setSelectedUser } = useSelectedUser();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {

            const response = await fetch('http://localhost:1234/controllers/getUsersList.php', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (data.success) {
                setUsers(data.users);
            } else {
                alert(data.error);
            }
        }
        fetchUsers();
    }, [])

    const fetchUserData = async (userId) => {
        const response = await fetch('http://localhost:1234/controllers/selectedUserDetails.php', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId })
        });
        const responseData = await response.json();
        if (responseData.success === false) {
            alert(responseData.error);
        } else {
            setSelectedUser(responseData.selectedUserDetails);
        }
        navigate('/editmember');
    }

    const deleteUser = async (userId) => {
        const takePermission = window.confirm('Are you sure you want to delete this user?');
        if (!takePermission) {
            return;
        }
        const response = await fetch('http://localhost:1234/controllers/deleteUser.php', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId })
        })
        const data = await response.json();
        console.log(data);
        if (data.success === false) {
            alert(data.error);
        } else {
            // alert(data.message); // message: user deleted successfully 
            setUsers(users.filter((user) => user.userId !== userId));
        }
    }
    return (
        <main id='main' className="main">
            <section className="section">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Default Table</h5>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Role ID</th>
                                    <th scope="col" className='text-center'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.userId}>
                                        <th scope="row">{user.userId}</th>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.status == 1 ? "Active" : "Inactive"}</td>
                                        <td>{user.roleId}</td>
                                        <td>
                                            <div className="d-flex gap-2 justify-content-center">
                                                <a onClick={() => fetchUserData(user.userId)} className="btn btn-primary">Edit</a>
                                                <a onClick={() => deleteUser(user.userId)} className="btn btn-danger">Delete</a>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="d-flex flex-row-reverse">
                            <Link type="button" to="/addnewmember" className="btn btn-secondary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill-add" viewBox="0 0 16 16">
                                    <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"></path>
                                    <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"></path>
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

