import { useState } from "react";
import { api } from "../../services/api";

function CreateUser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault(); //Impede o comportamento padrão do formulário de recarregar a página

        const newUser = {
            name,
            email
        };

        try {
            await api.post("/users", newUser);
            console.log("User created successfully!");

            setName("");
            setEmail("");
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };

    return (
        <div>
            <h1>Create User</h1>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Name"
                    value={name}  
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreateUser;