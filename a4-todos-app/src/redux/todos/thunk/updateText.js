import { live_server, local_server } from "../../../utils/server.config";
import { titleChanged } from "../actions";

const updateTitle = (todoId, currentText) => {
    return async (dispatch) => {
        const response = await fetch(`${live_server || local_server}/api/todos/${todoId}`, {
            method: "PATCH",
            body: JSON.stringify({
                text: currentText,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        const todo = await response.json();
        dispatch(titleChanged(todo?.id, todo?.text));
    };
};

export default updateTitle;