import React, { Suspense, lazy } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { Button, ConfigProvider  } from "antd";
// import Home from "./pages/Home";
// import About from "./pages/About";

// react懒加载实现分包
const Home = lazy(() => import(/* webpackChunkName: "home" */"./pages/Home"));
const About = lazy(() => import(/* webpackChunkName: "about" */"./pages/About"));
function App() {
    return (
        <ConfigProvider theme={{ token: { colorPrimary: '#00b96b'} }}>
            <div>
                <h1>App</h1>
                <Button type="primary">Button</Button>
                <ul>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                </ul>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/home" element={<Home />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </Suspense>
            </div>      
        </ConfigProvider>

    )
}

export default App;