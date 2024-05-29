import Conversations from "./Conversations"
import SearchBar from "./SearchBar"
import Logout from './Logout'

const Sidebar = () => {
  return (
    <div className="border-r border-slate-400 p-4 flex flex-col">
       <SearchBar/>
        <div className='divider px-3'></div>
       <Conversations/>
     <Logout/>
      
    </div>
  )
}

export default Sidebar
