import { useState } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

function CreateUser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); //Impede o comportamento padrão do formulário de recarregar a página

        if (!name.trim() || !email.trim()) {
            alert("Please fill in all fields.");
            return;
        }

        const newUser = {
            name,
            email
        };
        
        setLoading(true);

        try {
            await api.post("/users", newUser);
            console.log("User created successfully!");
            
            setName("");
            setEmail("");
            
            navigate("/")
        } catch (error) {
            console.error("Error creating user:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Create User</h1>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Name"
                    disabled={loading}
                    value={name}  
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    placeholder="Email"
                    disabled={loading}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create"}
                </button>
            </form>
        </div>
    );
}

export default CreateUser;