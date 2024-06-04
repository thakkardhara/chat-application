
import { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import useConversation from "../../zustand/UseConversation";
import UseGetConversations from "../../hooks/UseGetConversations";
import toast from "react-hot-toast";
const SearchBar = () => {
  const [search,setSearch]= useState("");
  const {setSelectedConversation}= useConversation();
  const {conversations}= UseGetConversations()
  const handleSubmit = (e)=>{
    e.preventDefault()
    if(!search)return;
    if(search.length < 3){
      return toast.error('search term must be at least 3 char long ')
    }
    const conversation = conversations?.find((c)=> c.fullname.toLowerCase().includes(search.toLowerCase()))
    if(conversation){
      setSelectedConversation(conversation)
      setSearch('')
    }else toast.error(`no user found with name ${search}`)
   
  }

  return (
    <>
    <form className='flex items-center gap-2' onSubmit={handleSubmit}>
        <input type="text" placeholder="Search..." className='input input-bordered rounded-full'
        value={search} onChange={(e)=> setSearch(e.target.value)} />
        <button type='submit' className='btn btn-circle bg-red-400 text-white'>
        <IoMdSearch className="w-6 h-6 outline-none" />
        </button>
    </form>
    
    </>
  )
}

export default SearchBar

