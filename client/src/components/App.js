import React from "react";
import About from "./pages/About";
import Landing from "./pages/Landing";
import Shop from "./pages/shop/Shop";
import ChatBot from "./chat/ChatBot";

import {BrowserRouter,Route, Routes} from 'react-router-dom';
import Header from "./Header";

const App=()=>{
    return <div>
   
   <BrowserRouter>
   <div class="container">
  
     <Header/>
     
   <Routes>
    <Route  path="/" Component={Landing} />
    <Route  path="/about" Component={About}/>
    <Route  path="/shop" Component={Shop}/>
</Routes>
   <ChatBot/>
    </div>
   </BrowserRouter>
    
    </div>
}
export default App;