import { Provider } from "react-redux";
// import Footer from "./components/Footer";
// import Header from "./components/Header";
// import Navbar from "./components/Navbar";
// import TodoList from "./components/TodoList";
import store from "./redux/store";
import Routes from "./routes";

function App() {
    return (
        <Provider store={store}>
            <Routes/>
        </Provider>
    );
}

export default App;
