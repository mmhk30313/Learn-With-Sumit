import { useState } from "react";
import tickImage from "../assets/images/double-tick.png";
import noteImage from "../assets/images/notes.png";
import plusImage from "../assets/images/plus.png";
import { 
    useAddTodoMutation,
    useBulkUpdateStatusMutation,
    useEditTodoMutation,
    useGetTodosQuery 
} from "../features/api/apiSlice";

export default function Header() {
    const [
        addTodo, 
        // {isLoading, isSuccess}
    ] = useAddTodoMutation();
    const [editTodo, {isLoading, isSuccess}] = useEditTodoMutation();
    const { data: todos } = useGetTodosQuery();
    // const [bulkUpdateStatus, {isLoading: isBulkUpdating, isSuccess: isBulkUpdated}] = useBulkUpdateStatusMutation();
    const [input, setInput] = useState("");

    const handleInput = (e) => {
        setInput(e.target.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        addTodo({
            data: {
                text: input,
                completed: false,
            },
        });
        setTimeout(() => {
            setInput("");
        }, 1000);
    };

    const handleAnyChange = (key, value, todo) => {
        editTodo({
            id: todo?.id,
            data: {
                ...todo,
                [key]: value,
            },
        });
    };

    const completeHandler = () => {
        // const inCompletedTodos = [...todos];
        const inCompletedTodos = todos?.filter((todo) => !todo?.completed);
        inCompletedTodos?.forEach((todo) => {
            if(!isLoading || isSuccess) {
                handleAnyChange("completed", true, todo);
            }
        });
        // const ids = completedTodos?.map((todo) => todo.id);
        // bulkUpdateStatus({
        //     ids,
        //     completed: true,
        // });

    };

    const clearHandler = () => {
        // dispatch(clearCompleted());
        const completedTodos = todos?.filter((todo) => todo?.completed);
        completedTodos?.forEach((todo) => {
            if(!isLoading || isSuccess) {
                handleAnyChange("completed", false, todo);
            }
        });
        // const ids = completedTodos?.map((todo) => todo.id);
        // // dispatch(allCompleted());
        // bulkUpdateStatus({
        //     ids,
        //     completed: false,
        // });
    };

    return (
        <div>
            <form
                className="flex items-center bg-gray-100 px-4 py-4 rounded-md"
                onSubmit={submitHandler}
            >
                <img src={noteImage} className="w-6 h-6" alt="Add todo" />
                <input
                    type="text"
                    placeholder="Type your todo"
                    className="w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-500"
                    value={input}
                    required={true}
                    onChange={handleInput}
                />
                <button
                    type="submit"
                    className={`appearance-none w-8 h-8 bg-[url('${plusImage}')] bg-no-repeat bg-contain`}
                ></button>
            </form>

            <ul className="flex justify-between my-4 text-xs text-gray-500">
                <li
                    className="flex space-x-1 cursor-pointer"
                    onClick={completeHandler}
                >
                    <img className="w-4 h-4" src={tickImage} alt="Complete" />
                    <span>Complete All Tasks</span>
                </li>
                <li className="cursor-pointer" onClick={clearHandler}>
                    Clear completed
                </li>
            </ul>
        </div>
    );
}
