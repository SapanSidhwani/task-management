import React, { useEffect, useState } from 'react';
import useGetRoles from '../hooks/useGetRoles';
import useSelectedUser from '../store/useSelectedUser';

const Roles = () => {
    const { getRoles } = useGetRoles();
    const [roles, setRoles] = useState([]);
    const { selectedUser } = useSelectedUser();

    useEffect(() => {
        const fetchData = async () => {
            const response = await getRoles();
            setRoles(response);
        }
        fetchData();
    }, []);

    return (
        roles.map((role) => (
            <option className='text-center' selected={selectedUser.roleId == role.rId} key={role.rId} value={role.rId}>{role.rName}</option>
        ))
    )
}

export default Roles
