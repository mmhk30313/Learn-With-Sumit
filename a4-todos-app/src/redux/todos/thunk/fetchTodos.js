import { loaded } from "../actions";
import {local_server , live_server } from "../../../utils/server.config";

const fetchTodos = async (dispatch) => {
    const response = await fetch(`${live_server || local_server}/api/todos`);
    const todos = await response.json();

    dispatch(loaded(todos));
};

export default fetchTodos;
