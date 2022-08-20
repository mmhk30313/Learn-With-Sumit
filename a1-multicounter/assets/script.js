// Select dom element
const addBtn = document.getElementById("add");
const resetBtn = document.getElementById("reset");
const counterContainer = document.getElementById("counter-container");

// Create initial state
const initialState = [
    {
        id: 1,
        value: 0,
    }
];

// Unique id for different counters
let id = 1;

// Action specifiers
const INCREMENT = "increment";
const DECREMENT = "decrement";
const ADD_COUNTER = "add";
const RESET = "reset";

// Action creators
const increment = (id, value) => {
    return {
        type: INCREMENT,
        payload: {
            id: id,
            value: value
        }
    };
};

const decrement = (id, value) => {
    return {
        type: DECREMENT,
        payload: {
            id: id,
            value: value
        }
    };
};

// Create reducer function
function counterReducer(state = initialState, action) {
    if (action.type === INCREMENT) {
        const curState = [...state];
        const idx = curState.findIndex((item) => item.id === action.payload.id);
        curState[idx].value += action.payload.value;
        return curState;
    } else if (action.type === DECREMENT) {
        const curState = [...state];
        const idx = curState.findIndex((item) => item.id === action.payload.id);
        curState[idx].value -= action.payload.value;
        return curState;
    } else if (action.type === ADD_COUNTER) {
        const curState = [...state];
        curState.push({id: ++id, value: 0});
        return curState;
    } else if(action.type === RESET){
        const curState = state.map((item) => {
            item.value = 0;
            return item;
        } );
        return curState;
        // id = 1;
        // return [{id, value: 0}];
    } else {
        return state;
    }
}

// Create store
const store = Redux.createStore(counterReducer, initialState);


// Create new counter div when click add counter button
addBtn.addEventListener("click", function () {
    store.dispatch({
        type: "add",
    });
});

// Create reset function for reset state
resetBtn.addEventListener("click", function () {
    store.dispatch({
        type: "reset",
    });
});

// Create render function for show updated state in ui
function render() {
    const state = store.getState();
    // console.log({ state });
    counterContainer.innerHTML = "";
    state.forEach((item) => {
        // Create new counter div
        const div = document.createElement("div");
        div.classList = "p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow counter";
        
        const counter = document.createElement("div");
        counter.classList = "text-2xl font-semibold";
        div.appendChild(counter);
        counter.innerText = item?.value || 0;
        const btnContainer = document.createElement("div");
        btnContainer.classList = "flex space-x-3";

        const incrementBtn = document.createElement("button");
        incrementBtn.classList = "bg-indigo-400 text-white px-3 py-2 rounded shadow";
        incrementBtn.innerText = "Increment";

        // Create increment function for increment button
        incrementBtn.onclick = function () {
            store.dispatch(increment(item.id, item.id));
        };

        const decrementBtn = document.createElement("button");
        decrementBtn.classList = "bg-red-400 text-white px-3 py-2 rounded shadow";
        decrementBtn.innerText = "Decrement";

        // Create decrement function for decrement button
        decrementBtn.onclick = function () {
            store.dispatch(decrement(item.id, item.id));
        };

        // Append buttons to button container
        btnContainer.appendChild(incrementBtn);
        btnContainer.appendChild(decrementBtn);
        div.appendChild(btnContainer);

        // Append counter div to counter container
        counterContainer.append(div);
    });
}

// Update ui initially
render();

// Subscribe store
store.subscribe(render);