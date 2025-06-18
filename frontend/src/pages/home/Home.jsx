import MessageDisplay from "../../components/messages/MessageDisplay"
import Sidebar from "../../components/sidebar/Sidebar"
import useMobileView from "../../zustand/UseMobileView";


const Home = () => {
    const { isMobileView } = useMobileView();
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 w-full">
      {/* Sidebar */}
      <div className={`${isMobileView ? "hidden" : "block"} md:block w-full md:w-[35%]`}>
        <Sidebar />
      </div>

      {/* Chat Window */}
      <div className={`${isMobileView ? "w-full" : "hidden"} md:block md:w-[65%]`}>
        <MessageDisplay />
      </div>
    </div>
    
  )
}

export default Home
