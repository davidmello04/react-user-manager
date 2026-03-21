import { create } from "zustand";
import { api } from "../services/api";

export const useUserStore = create((set) => ({
    users: [],
    loading: false,

    fetchUsers: async () => {
        set({ loading: true });

        try {
            const response = await api.get("/users");
            set({ users: response.data });
        } catch (error) {
            console.error("Failed to fetch users:", error);
        } finally {
            set({ loading: false });
        }
    }
}));