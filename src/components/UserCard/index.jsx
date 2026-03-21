function UserCard({ user }) {
    return (
        <li>
            <strong>{user.name}</strong> <br />
            <span>{user.email}</span>
            <p>{user.phone}</p>
            <p>{user.company.name}</p> <br />
        </li>
    )
}

export default UserCard;