import Users from "../pages/Users";
import CreateUser from "../pages/CreateUser";

export const routes = [
    { path: "/", element: <Users /> },
    { path: "/create", element: <CreateUser /> }
];