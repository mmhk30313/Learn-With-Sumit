import React, { Fragment } from "react";
import cancelImage from "../assets/images/cancel.png";
import ok from "../assets/images/double-tick.png";
import { useDeleteTodoMutation, useEditTodoMutation } from "../features/api/apiSlice";
import TodoLoader from "./loaders/TodoLoader";

export default function Todo({ todo, isBottomList }) {
    const [editTodo, {isLoading, isSuccess}] = useEditTodoMutation();
    const [deleteTodo, {isLoading: isDeleting, isSuccess: isDeleted}] = useDeleteTodoMutation();

    const [editableTodoId, setEditableTodoId] = React.useState(null);

    const { text, id, completed, color } = todo;

    const handleAnyChange = (key, value, todoId) => {
        editTodo({
            id: todoId,
            data: {
                ...todo,
                [key]: value,
            },
        });
    };

    const handleStatusChange = (todoId) => {
        handleAnyChange("completed", !completed, todoId);
    };

    const handleColorChange = (todoId, color) => {
        handleAnyChange("color", color, todoId);
    };

    const handleDelete = (todoId) => {
        deleteTodo(todoId);
    };

    const handleSubmitForChangingTitle = (e) => {
        e.preventDefault();
        const newTitle = e?.target?.title?.value;
        // console.log({id: editableTodoId, text: newTitle});
        handleAnyChange("text", newTitle, editableTodoId);
        setTimeout(() => {
            setEditableTodoId(null);
        } , 1000);
    }

    // console.log({isLoading, isSuccess, isDeleting, isDeleted});

    return (
        <div 
            className={`flex justify-start items-center p-2 hover:bg-gray-100 hover:transition-all space-x-4 border-b border-gray-400/20 last:border-0`}
            // className={`${completed && !isBottomList && "hidden"} flex justify-start items-center p-2 hover:bg-gray-100 hover:transition-all space-x-4 border-b border-gray-400/20 last:border-0`}
        >
            {
                isDeleting
                ? <TodoLoader />
                : <Fragment>
                    <div
                        className={`hover:bg-purple-800 cursor-pointer relative rounded-full bg-white border-2 border-gray-400 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 
                            ${
                                completed &&
                                "border-green-500 focus-within:border-green-500"
                            }`
                        }
                    >
                        <input
                            type="checkbox"
                            checked={completed}
                            onChange={() => handleStatusChange(id)}
                            className="cursor-pointer opacity-0 absolute rounded-full transition-all duration-500"
                        />
                        {completed && (
                            <svg
                                className={`fill-current w-3 h-3 text-green-500 pointer-events-none`}
                                viewBox="0 0 20 20"
                            >
                                <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                            </svg>
                        )}
                    </div>

                    <div
                        // className={`select-none flex-1 line-none w-96`}
                        className={`select-none flex-1 ${completed && "line-through"}`}
                    >
                        {   isLoading
                            ? <TodoLoader/> :
                            editableTodoId
                            ?   <form id="todo-title-form" className="relative" onSubmit={handleSubmitForChangingTitle}>
                                    <input 
                                        type="text"
                                        autoFocus
                                        name="title"
                                        className={`${isBottomList && "hidden"} placeholder:italic placeholder:animate-ping placeholder:text-xs placeholder:text-red-400 block bg-gray-100 w-96 border border-slate-300 rounded-md py-2 pl-4 pr-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm`} 
                                        defaultValue={text}
                                        required
                                    />
                                    <button 
                                        type="submit"
                                        className="absolute top-[10px] right-[150px] w-4 h-4 z-10 border border-green-500 rounded-full flex justify-center items-center"
                                    >
                                        <img
                                            src={ok}
                                            className="w-2 h-3 cursor-pointer"
                                            alt="Ok"
                                            // onClick={() => setEditableTodoId(null)}
                                        />
                                    </button>

                                    <img
                                        src={cancelImage}
                                        className="absolute top-[10px] right-[130px] z-10 flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
                                        alt="Cancel"
                                        onClick={() => setEditableTodoId(null)}
                                    />
                                </form>
                            : text
                        }
                    </div>
                    <Fragment>
                        <button
                            disabled={completed ? true : false}
                            className={`${completed && "cursor-not-allowed"} focus:outline-none bg-purple-400 hover:bg-purple-800 text-white font-bold p-1 rounded-full inline-flex items-center`}
                            onClick={() => setEditableTodoId(id)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                width="10" height="10"
                                viewBox="0 0 32 32"
                                
                                style={{fill:"#000000"}}
                            >    
                                <path 
                                    className="fill-current text-white"
                                    d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"
                                />
                            </svg>
                        </button>
                        <div
                            className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-green-500 border-green-500 ${
                                color === "green" && "bg-green-500"
                            }`}
                            onClick={() => handleColorChange(id, "green")}
                        ></div>

                        <div
                            className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-yellow-500 border-yellow-500 ${
                                color === "yellow" && "bg-yellow-500"
                            }`}
                            onClick={() => handleColorChange(id, "yellow")}
                        ></div>

                        <div
                            className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-red-500 border-red-500 ${
                                color === "red" && "bg-red-500"
                            }`}
                            onClick={() => handleColorChange(id, "red")}
                        ></div>

                        <img
                            src={cancelImage}
                            className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
                            alt="Cancel"
                            onClick={() => handleDelete(id)}
                        />
                    </Fragment>
                </Fragment>
            }
            
        </div>
    );
}
