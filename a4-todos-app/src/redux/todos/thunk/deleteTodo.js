import { deleted } from "../actions";
import {local_server , live_server } from "../../../utils/server.config";

const deleteTodo = (todoId) => {
    return async (dispatch) => {
        await fetch(`${live_server || local_server}/api/todos/${todoId}`, {
            method: "DELETE",
        });

        dispatch(deleted(todoId));
    };
};

export default deleteTodo;
