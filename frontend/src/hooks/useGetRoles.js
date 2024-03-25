const useGetRoles = () => {
    const getRoles = async () => {
        const response = await fetch('http://localhost:1234/controllers/getRoles.php', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (data.success) {
            return data.roles
        } else {
            alert(data.error);
            return [];
        }
    }
    return { getRoles };
}

export default useGetRoles;