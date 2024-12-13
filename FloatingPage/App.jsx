import { useEffect, useState } from "react"

export default function App() {
    const [currentTask, setCurrentTask] = useState({});
    useEffect(() => {
        console.log('yaha to aaye the');

        window.versions.getCurrentTodo((todo) => {
            console.log(todo);
            setCurrentTask(todo);
        })
    }, [])

    const clickbtn = async (event) => {
        const response = await window.versions.ding();
        console.log(response);
    }
    return (
        <>
            <div className="flex flex-col" >
                <div className="text-[#ffffff79] text-sm">
                    task
                </div>
                <div className="text-[#ffffff] text-2xl font-mono my-1">
                    {currentTask?.title}
                </div>
                <div className="text-white">
                    <button
                        type="button"
                        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-2 py-1 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        onClick={clickbtn}
                    >
                        return
                    </button>

                </div>
            </div>
        </>
    )
}