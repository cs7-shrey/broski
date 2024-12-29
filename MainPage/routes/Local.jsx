import dayjs from "dayjs";

import Todo from "../components/Todo";
import { useEffect, useState } from "react";
import { useTodoContext } from "../context/TodoContext";
import TimePicker from "../components/TimePicker";

export default function Local() {
    const format = 'HH:mm:ss';
    const { todos, setTodos } = useTodoContext();
    const [currentTodo, setCurrentTodo] = useState();

    const [newTodo, setNewTodo] = useState('');
    const [newStartTime, setNewStartTime] = useState('00:00');
    const [newEndTime, setNewEndTime] = useState('00:00');

    const [value, setValue] = useState('10:00');
    function getCurrentTodo(todos) {
        for (let todo of todos) {
            const now = new Date();
            const startHour = todo.startTime.hour;
            const startMinute = todo.startTime.minute;
            const endHour = todo.endTime.hour;
            const endMinute = todo.endTime.minute;
            if (now.getHours() <= endHour && now.getHours() >= startHour) {
                if (now.getHours() == startHour && now.getMinutes() < startMinute) {
                    continue;
                }
                if (now.getHours() == endHour && now.getMinutes() > endMinute) {
                    continue;
                }
                return todo;
            }
        }
    }

    useEffect(() => {
        const currentTodo = getCurrentTodo(todos);
        setCurrentTodo(currentTodo);
    }, [todos])

    function onStartTimeChange(event) {
        setNewStartTime(event.target.value);
    }
    function onEndTimeChange(event) {
        setNewEndTime(event.target.value);
    }

    function timeToDecimal(value) {
        if (value / 10 < 1) {
            return value % 10;
        }
        return value;
    }
    const floatScreen = (e) => {
        window.versions.ping(currentTodo);
    }

    function addTodo() {
        const [startHour, startMinute] = newStartTime.split(':').map((value) => timeToDecimal(value));
        const [endHour, endMinute] = newEndTime.split(':').map((value) => timeToDecimal(value));
        if (!newTodo || endHour < startHour || (endHour == startHour && endMinute < startMinute)) {
            console.error('Cannot add todo, incorrect details');
            return;
        }
        const todo = {
            id: null,
            title: newTodo,
            startTime: {
                hour: startHour,
                minute: startMinute
            },
            endTime: {
                hour: endHour,
                minute: endMinute
            }
        }
        // console.log(todo);
        window.versions.createTodo(todo);
        setTodos([...todos, todo]);
        setNewTodo('');
    }

    return (
        <>
            <div className="pt-5 p-2 flex align-bottom justify-start">
                <div className="mt-auto w-[50%] mx-1">
                    <input
                        type="text"
                        className="w-[100%] bg-[#ffffffcc] rounded-lg h-12 ring-2 focus:ring-4 focus:outline-none p-2"
                        placeholder="Create new task"
                        onChange={(e) => {
                            setNewTodo(e.target.value);
                        }}
                        value={newTodo}
                    />
                </div>
                <TimePicker
                    startTime={newStartTime}
                    setStartTime={onStartTimeChange}

                    endTime={newEndTime}
                    setEndTime={onEndTimeChange}
                />
                <div className="mt-auto">   
                    <button
                        type="button"
                        className="text-white bg-[#050505] hover:bg-black focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-2xl mx-2     text-sm px-5 py-2.5"
                        onClick={addTodo}
                    >
                        Add Todo
                    </button>
                </div>
            </div>
            <div className="pt-5">
                {/* <Todo content='somethings to do' /> */}
                {todos && todos.map((item, index) => {
                    // return <Todo content={item.title} key={item.id} start_time={item.start_time.hour} end_time={item.end_time.hour} />
                    return <Todo todoObject={{ ...item }} key={index} />
                })}
                {/* {currentTodo &&
                    <div className="flex bg-[#ffffff] m-2 rounded-lg p-2 w-full gap-2">
                        <div>
                            ={'>'} Current Todo:
                        </div>

                        <div>
                            {currentTodo.title}
                        </div>
                    </div>} */}
                <div className="mx-2 mt-4">
                    <button
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                    onClick={floatScreen}
                    >
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Float
                        </span>
                    </button>
                </div>
            </div>
        </>
    )
}