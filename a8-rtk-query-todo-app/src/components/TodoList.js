import React from "react";
import { useSelector } from "react-redux";
import { 
    // useGetTodosByCompletedStatusQuery, 
    useGetTodosQuery 
} from "../features/api/apiSlice";
import TodoListLoader from "./loaders/TodoListLoader";
import Todo from "./Todo";

export default function TodoList() {
    // const { data: todos, isLoading, isError } = useGetTodosByCompletedStatusQuery(false);
    const {data: todos, isLoading, isError, isSuccess} = useGetTodosQuery();

    const filters = useSelector((state) => state?.filters);

    const filterByStatus = (todo) => {
        const { status } = filters;
        switch (status) {
            case "Complete":
                return todo.completed;

            case "Incomplete":
                return !todo.completed;

            default:
                return true;
        }
    };

    const filterByColors = (todo) => {
        const { colors } = filters;
        if (colors.length > 0) {
            return colors.includes(todo?.color);
        }
        return true;
    };

    // console.log({filters, todos});

    return (
        <React.Fragment>
            {
                isLoading 
                ?   <TodoListLoader/>
                :   <div className="mt-2 text-gray-700 text-sm max-h-[350px] overflow-y-auto">
                        {   
                            todos
                            ?.filter(filterByStatus)
                            ?.length
                            ?   todos
                                ?.filter(filterByStatus)
                                ?.filter(filterByColors)
                                ?.map((todo) => (
                                    <Todo todo={todo} key={todo.id} />
                                ))
                            : <p className="text-center text-gray-500">No tasks</p>
                            
                        }
                    </div>
            }
            
            
        </React.Fragment>
    );
}
