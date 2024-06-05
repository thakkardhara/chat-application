import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { SocketContextProvider } from './context/SocketContext.jsx'
// import UseConversation from './zustand/UseConversation.js'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthContextProvider>
        <SocketContextProvider>
            {/* <UseConversation> */}
                <App />
            {/* </UseConversation> */}
        </SocketContextProvider>
    </AuthContextProvider>,
    </BrowserRouter>
  </React.StrictMode>,
)


// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import { AuthContextProvider } from './context/AuthContext';
// import { SocketContextProvider } from './context/SocketContext';
// import { UseConversationProvider } from './zustand/UseConversation';

// ReactDOM.render(
//     <AuthContextProvider>
//         <SocketContextProvider>
//             <UseConversationProvider>
//                 <App />
//             </UseConversationProvider>
//         </SocketContextProvider>
//     </AuthContextProvider>,
//     document.getElementById('root')
// );
