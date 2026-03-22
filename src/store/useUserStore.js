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

    createUser: async (newUser) => {
        try {
            const response = await api.post("/users", newUser);

            set((state) => ({
                users: [...state.users, response.data],
                error: null
            }));
            return true;
        } catch (error) {
            set({ error: "Failed to create user. Please try again." });
            return false;
        }
    }
}));