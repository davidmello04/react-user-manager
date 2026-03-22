import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";
import toast from "react-hot-toast";

function CreateUser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { createUser } = useUserStore();

    const handleSubmit = async (e) => {
        e.preventDefault(); //Impede o comportamento padrão do formulário de recarregar a página

        if (!name.trim() || !email.trim()) {
            toast.error("Please fill in all fields.");
            return;
        }

        const newUser = {
            name,
            email
        };
        
        setLoading(true);

        try {
            const success = await createUser(newUser);

            if (!success) {
                toast.error("Failed to create user. Please try again.");
                return;
            } else {
                toast.success("User created successfully!");
            }
            
            setName("");
            setEmail("");
            
            navigate("/");
        } catch (error) {
            toast.error("Failed to create user. Please try again.");
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