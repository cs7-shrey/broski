import { createContext, useContext, useState, useEffect } from "react";

const TodoContext = createContext();

export function TodoContextProvider({children}) {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const fetchTodos = async () => {
            if (window.versions?.readTodos) {
                // Access Electron's API
                const todos = await window.versions.readTodos();
                setTodos(todos);
            } else {
                // Fallback for development (e.g., mock data or empty array)
                console.warn('Electron APIs are not available.');
                setTodos([]);
            }
        }
        fetchTodos();
        // console.log(window.versions)
    }, [])

    return (
        <TodoContext.Provider value={{ todos, setTodos }}>
            {children}
        </TodoContext.Provider>
    )
}

export const useTodoContext = () => {
    return useContext(TodoContext);
}