import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Main from "./pages/main";
import Send from "./pages/send";
import Receive from "./pages/receive";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/send" element={<Send />} />
                <Route path="/receive" element={<Receive />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
