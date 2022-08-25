import { colorSelected } from "../actions";
import {local_server , live_server } from "../../../utils/server.config";

const updateColor = (todoId, color) => {
    return async (dispatch) => {
        const response = await fetch(`${live_server || local_server}/api/todos/${todoId}`, {
            method: "PATCH",
            body: JSON.stringify({
                color: color,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        const todo = await response.json();

        dispatch(colorSelected(todo.id, todo.color));
    };
};

export default updateColor;
