import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Map from "./Components/Map/Map";

const app: React.FC<{}>  = () => {
    return <>
                <BrowserRouter>
                    <Route path="/" exact component={Map} />;
                </BrowserRouter>
            </>
    
}

export default app;