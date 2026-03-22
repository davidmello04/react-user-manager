import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";
import toast from "react-hot-toast";

function CreateUser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [company, setCompany] = useState("");

    const navigate = useNavigate();
    const { createUser, creatingUser } = useUserStore();

    const handleSubmit = async (e) => {
        e.preventDefault(); //Impede o comportamento padrão do formulário de recarregar a página

        if (!name.trim() || !email.trim() || !phone.trim() || !company.trim()) {
            toast.error("Please fill in all fields.");
            return;
        }

        const newUser = {
            name,
            email,
            phone,
            company: {
                name: company
            }
        };

        try {
            const result = await createUser(newUser);

            if (!result.success) {
                toast.error(result?.message);
                return;
            } else {
                toast.success("User created successfully!");
            }
            
            setName("");
            setEmail("");
            setPhone("");
            setCompany("");
            
            navigate("/");
        } catch (error) {
            toast.error("Failed to create user. Please try again.");
        }
    };

    return (
        <div>
            <h1>Create User</h1>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Name"
                    disabled={creatingUser}
                    value={name}  
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    placeholder="Email"
                    disabled={creatingUser}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    placeholder="Phone"
                    disabled={creatingUser}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <input
                    placeholder="Company Name"
                    disabled={creatingUser}
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />

                <button type="submit" disabled={creatingUser}>
                    {creatingUser ? "Creating..." : "Create"}
                </button>
            </form>
        </div>
    );
}

export default CreateUser;