import {create} from 'zustand';

//get the set as callback function just like useState

const useConversation = create((set)=>({
    selectedConversation:null, //default selected conversation is null
    setSelectedConversation:(selectedConversation)=> set({selectedConversation}) ,// it update the state with updating 
    messages:[],
    // setMessages:(messages)=> set({messages})
    setMessages:(messages) => set({ messages }),
}))

export default useConversation;
