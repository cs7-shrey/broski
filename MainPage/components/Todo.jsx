import Del from "../assets/delete.svg";
import { useTodoContext } from "../context/TodoContext";
export default function Todo({ todoObject }) {
    // console.log(todoObject);
    let { todos, setTodos } = useTodoContext();
    function replaceMinutes(minutes) {
        if (minutes < 10) {
            return `0${minutes}`;
        }
        return minutes;
    }
    async function deleteTodo(event) {
        await window.versions.deleteTodo(todoObject.id);
        // const newTodos = todos.filter((todo) => todo.id !== todoObject.id);
        const newTodos = await window.versions.readTodos()
        setTodos(newTodos);
    }
    return (
        <div className="flex bg-[#ffffff] m-2 rounded-lg p-2 w-full">
            <input type="checkbox" className="" name="" id="" />
            <div className="flex w-full gap-2">
                <div className="px-2 text-lg flex flex-col justify-center">
                    {todoObject.title}
                </div>
                <div className="flex self-center gap-1 ml-auto">
                    <div className="text-xs text-gray-500">Start: {todoObject.startTime.hour}:{replaceMinutes(todoObject.startTime.minute)} </div>
                    <div className="text-xs text-gray-500">End: {todoObject.endTime.hour}:{replaceMinutes(todoObject.endTime.minute)} </div>
                </div>
                <div>
                    <button className="my-auto h-full">
                        <img src={Del} alt="delete icon" className="w-7 h-7" onClick={deleteTodo} />
                    </button>
                </div>
            </div>
        </div>
    )
}