import Nav from "./nav"
import UserContext from "./context";
import { HashRouter,Routes,Route } from "react-router-dom";
import Create from "./create";
import Deposit from "./deposit";
import Withdraw from "./withdraw";
import Alldata from "./alldata";
import Home from "./home";


export default function App(){
    
    return(<>
    <UserContext.Provider value={{
        "users":[
            {
                name:"Shailedj K",
                eamil:"shailedj440@gmail.com",
                password:521681,
                balance:100
            },
        ]
    }}>
        <Nav />
        <HashRouter>
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/create' element={<Create />}></Route>
            <Route path="/deposit" element={<Deposit />}></Route>
            <Route path="/withdraw" element={<Withdraw />}></Route>
            <Route path="/alldata" element={<Alldata />}></Route>
        </Routes>
        </HashRouter>
        </UserContext.Provider>
    </>)
}