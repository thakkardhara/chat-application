import Conversations from "./Conversations"
import SearchBar from "./SearchBar"
import Logout from './Logout'
import CreateGroup from './CreateGroup' // Add this import

const Sidebar = () => {
  return (
    <div className="border-r border-slate-400 p-4 flex flex-col">
       <SearchBar/>
       <div className='divider px-3'></div>
       <CreateGroup/> {/* Add this line */}
       <Conversations/>
       <Logout/>
    </div>
  )
}

export default Sidebar
