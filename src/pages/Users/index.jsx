import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Link } from "react-router-dom";
import UserCard from "../../components/UserCard";

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadUsers() {
            try {
                const response = await api.get('/users');
                setUsers(response.data); 
            } catch (error) {
                setError('Failed to load users');
            } finally {
                setLoading(false);
            }
        }

        loadUsers();
    }, []);

    return (
        <div>
            <h1>Users</h1>
            <Link to="/create">
                <button>Create User</button>
            </Link>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <ul>
                    {users.map(user => (
                        <UserCard key={user.id} user={user} />
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Users;