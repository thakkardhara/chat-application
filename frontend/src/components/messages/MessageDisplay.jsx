import {TiMessages} from 'react-icons/ti'
import MessageInput from "./MessageInput"
import Messages from "./Messages"
import useConversation from '../../zustand/UseConversation'
import { useEffect } from 'react'
import { useAuthContext } from '../../context/AuthContext'
// import { MdAddIcCall } from "react-icons/md";
// import { FaVideo } from "react-icons/fa";
const MessageDisplay = () => {
  // const noChats = false;

  const {selectedConversation,setSelectedConversation}= useConversation();

  //after logout pehla nu selected nai reh
  useEffect(()=>{
    return()=> setSelectedConversation(null)

  },[setSelectedConversation])

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        <NoChats/>
      ) :(
        <>
        {/* header */}
        {/* <div className="bg-slate-500 px-4 py-2 mb-2">
          <span className="label-text">To:</span>
          <span className="text-gray-900 font-bold">{selectedConversation.fullname}</span>
        </div> */}
{/* 
<div className="bg-slate-500 px-4 py-2 mb-2 flex justify-between items-center">
    <div>
        <span className="label-text">To:</span>
        <span className="text-gray-900 font-bold ml-2">{selectedConversation.fullname}</span>
    </div>
    <div className="flex items-center space-x-4">
        <MdAddIcCall className="text-white" />
        <FaVideo className="text-white" />
    </div>
</div> */}
        <Messages />
        <MessageInput />
      </>
      )}   
  
    </div>
  )
}

export default MessageDisplay


export const NoChats = () => {

  const {authUser} = useAuthContext();

	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 {authUser.fullname}  ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};


