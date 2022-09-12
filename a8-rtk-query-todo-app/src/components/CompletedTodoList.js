import React from "react";
import { useSelector } from "react-redux";
import { useGetTodosByCompletedStatusQuery } from "../features/api/apiSlice";
import Footer from "./Footer";
import Todo from "./Todo";

const CompletedTodoList = () => {
    const {data: todos, isLoading, isError} = useGetTodosByCompletedStatusQuery(true);
    // const todos = useSelector((state) => state.todos);
    const filters = useSelector((state) => state.filters);
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(fetchTodos);
    // }, [dispatch]);

    // const filterByStatus = (todo) => {
    //     const { status } = filters;
    //     switch (status) {
    //         case "Complete":
    //             return todo.completed;

    //         case "Incomplete":
    //             return !todo.completed;

    //         default:
    //             return true;
    //     }
    // };

    const isAnyTodoCompleted = todos?.some((todo) => todo.completed);

    return (
        <React.Fragment>
            {
                isAnyTodoCompleted && (
                    <div className="w-full mx-auto max-w-3xl shadow-lg rounded-lg p-6 bg-white my-3">
                        <div className="flex items-center bg-green-100 px-4 py-4 rounded-md">
                            <p className="motion-safe:animate-bounce text-center text-green-500">Completed Todo</p>
                        </div>
                        <hr className="mt-3" />
                        <div className="relative text-gray-700 text-sm max-h-[120px] overflow-y-auto">
                            {   
                                todos
                                // .filter(filterByStatus)
                                .map((todo) => (
                                    todo.completed && <Todo todo={todo} isBottomList={true} key={todo.id} />
                                ))
                            }
                            
                        </div>
                        <Footer isForBottomList={true}/>
                    </div>
                )
            }
            {/* <div className={`h-[${!isAnyTodoCompleted ? "37.5vh" : ""}]`}> */}
                    {/* </div> */}
        </React.Fragment>
    );
};

export default CompletedTodoList;