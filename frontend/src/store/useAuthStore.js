import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js"
import toast from "react-hot-toast";
import {io} from "socket.io-client";
const BASE_URL="http://localhost:5001";

export const useAuthStore = create((set,get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIng: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
     onlineUsers:[],
     socket:null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
            get().connectSocket();
        }
        catch (error) {
            console.log("Error in checkAuth ", error);
            set({ authUser: null });
        }

        finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
            toast.success("Account Created succesfully");

        } catch (error) {
            toast.error(error.response.data.message);
            console.log("Error in signup :", error);
        }
        finally {
            set({ isSigningUp: false });
        }
    },

    loggout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Loged out Successfully");
            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    login: async (data) => {
        set({ isLoggingIng: true });
          console.log("hii");

        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Logged in Successfully")
            get().connectSocket();
        } catch (error) {  
            //  toast.error(error.response.data.message);
            console.log("Error in signup :", error);
        }
        finally {
            set({ isLoggingIng: false });
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data });
            toast.success("Profile updated Successfully")
        } catch (error) {
            console.log("error in update Profile : ", error);
            toast.error(error.response.data.message);
        }
        finally {
             set({ isUpdatingProfile: false });
        }
    },

    connectSocket:()=>{

        const {authUser}=get();
        if(!authUser || get().socket?.connected) return;

        const socket=io(BASE_URL,{
            query:{
                userId:authUser._id,
            },
        });
        socket.connect();

        set({socket:socket});

        socket.on("getOnlineUsers",(userList)=>{
            set({onlineUsers:userList});
            
        });
    },
    disconnectSocket:()=>{
        if(get().socket?.connected) get().socket.disconnect();
    },
}));