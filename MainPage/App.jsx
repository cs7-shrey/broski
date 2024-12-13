import { useEffect, useState } from "react"
import { Routes, Route, Outlet, Link, Navigate } from "react-router";
import Todo from "./components/Todo"
import Local from "./routes/Local";
import NotionPage from "./components/NotionPage/NotionPage";
import { TodoContextProvider } from "./context/TodoContext";
import bg from "./assets/otherbg.jpeg"

function SideBarButton({ children }) {
    return (
        <div className="p-1 m-2 rounded-md mr-auto text-lg">
            {children}
        </div>
    )
}

export default function App() {


    return (
        <>
            <div className="grid grid-cols-12 ">
                <div className="col-span-2 h-screen bg-[#0c0c0c]">
                    <div className="flex flex-col px-1 pt-4">
                        <div className="flex">
                            <input type="search" className="ring py-2 px-3 rounded-xl mx-2 my-4 bg-[#161616da] text-[#efefef] w-full focus:outline-none" placeholder="Search" />
                        </div>
                        <div className="flex flex-col text-white">
                            <SideBarButton>
                                <Link to="/local" className="font-mono w-full flex justify-center">{'><'} Local</Link>
                            </SideBarButton>
                            <SideBarButton>
                                <Link to="/notion" className="font-mono w-full flex justify-center">{'<>'} Notion</Link>
                            </SideBarButton>
                        </div>
                    </div>
                </div>
                <div className="col-span-10 bg-cover min-h-screen"
                    style={{ backgroundImage: `url(${bg})`,
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    backgroundBlendMode: 'multiply',
                }}
                >
                    <div className="flex flex-col px-20 pt-10 h-full bg-white/5 backdrop-blur-2xl">
                        <div className="h-full w-full">
                            <div className="font-mono text-5xl text-white">
                                <p>Good Morning, Shrey! 👋 </p>
                            </div>
                            <Outlet />

                        </div>
                    </div>
                    {/* <NotionPage /> */}
                </div>
            </div>
        </>
    )
}

export function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<App />} >
                <Route index element={<Navigate to="local" />} />
                <Route element={
                    <TodoContextProvider>
                        <Outlet />
                    </TodoContextProvider>
                }>
                    <Route path="local" element={<Local />} />
                </Route>
                <Route path="notion" element={<NotionPage />} />
            </Route>
        </Routes>
    )
}