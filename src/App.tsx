import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Map from "./Components/Map/Map";
import Login from "./Components/Login/Login";

const App: React.FC<{}>  = () => {
    return <>
                <BrowserRouter>
                    <Route path="/map" component={Map} />
                    <Route path="/" exact component={Login} />
                </BrowserRouter>
            </>
    
}

export default App;