import { create } from "zustand";
import { api } from "../services/api";

export const useUserStore = create((set) => ({
    users: [],
    loading: false,
    error: null,

    fetchUsers: async () => {
        set({ loading: true });

        try {
            const response = await api.get("/users");
            set({ users: response.data, error: null });
        } catch (error) {
            set({ error: "Failed to fetch users. Please try again." });
        } finally {
            set({ loading: false });
        }
    },
    
    creatingUser: false,

    createUser: async (newUser) => {
        set({ creatingUser: true });

        try {
            const response = await api.post("/users", newUser);

            set((state) => ({
                users: [...state.users, response.data],
                error: null,
                creatingUser: false
            }));
            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || "Unexpected error. Please try again.";
            set({
                error: message,
                creatingUser: false
            });

            return {success: false, message };
        }
    },

    updateUser: async (updateUser) => {
        try {
            const response = await api.put(`/users/${updateUser.id}`, updateUser);

            set((state) => ({
                users: state.users.map(user =>
                    user.id === updateUser.id ? response.data : user
                ),
                error: null
            }));
            return true;
        } catch (error) {
            set({ error: "Failed to update user. Please try again." });
            return false;
        }
    },

    deleteUser: async (id) => {
        try {
            await api.delete(`/users/${id}`);

            set((state) => ({
                users: state.users.filter(user => user.id !== id),
                error: null
            }));
            return true;
        } catch (error) {
            set({ error: "Failed to delete user. Please try again." });
            return false;
        }
    }
}));