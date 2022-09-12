import { Provider } from "react-redux";
import { store } from "./app/store";
import CompletedTodoList from "./components/CompletedTodoList";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import TodoList from "./components/TodoList";
// import store from "./redux/store";

function App() {
    return (
        <Provider store={store}>
            <Navbar />
            <div className="w-full min-h-[91.5vh] bg-blue-100 overflow-y-hidden">
                <div className="flex flex-col px-5 py-5 font-sans">

                    <div className="w-full mx-auto max-w-3xl shadow-lg rounded-lg p-6 bg-white">
                        <Header />

                        <hr className="mt-4" />

                        <TodoList />

                        <hr className="mt-4" />

                        <Footer />

                    </div>

                    {/* <CompletedTodoList /> */}
                </div>
            </div>
        </Provider>
    );
}

export default App;
