import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";


export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessageLoading: false,


    getUsers: async () => {
        set({ isUserLoading: true });
        try {
            const res = await axiosInstance.get("messages/users");
            set({ users: res.data });
        } catch (error) {
            toast.error(error.response.data.messages);
        }
        finally {
            set({ isUserLoading: false });
        }
    },

    getMessages: async (userId) => {
        set({ isMessageLoading: true });
        try {
            const res = await axiosInstance.get(`messages/${userId}`)
            set({ messages: res.data });
            console.log("getmessage : ",userId);

        } catch (error) {
            toast.error(error.response.data.messages);
        } finally {
            set({ isMessageLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        console.log("Sendmessage : ", messageData);
        try {

            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set({ messages: [...messages, res.data] })

        } catch (error) {
            toast.error(error.response.data.messages);
            // toast.error("Error While sending message")
        }
    },


    setSelectedUser: (selectedUser) => set({ selectedUser }),
}));




