import { create } from "zustand";

const useConversation = create((set) => ({
    messages: [],
    setMessages: (fn) => set((state) => ({
        messages: typeof fn === "function" ? fn(state.messages) : fn
    })),
    addMessage: (msg) => set((state) => {
        // Duplicate check by _id
        if (state.messages.some(m => m._id === msg._id)) return {};
        return { messages: [...state.messages, msg] };
    }),
    selectedConversation: null, //default selected conversation is null
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }), // it update the state with updating 
}));

export default useConversation;


