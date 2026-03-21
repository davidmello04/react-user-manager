import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";
import UserCard from "../../components/UserCard";


function Users() {
    const { users, loading, fetchUsers } = useUserStore();
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                await fetchUsers();
            } catch (error) {
                setError("Failed to load users. Please try again.");
            }
        };

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