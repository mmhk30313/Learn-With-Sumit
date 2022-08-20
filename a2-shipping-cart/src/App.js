import { Provider } from "react-redux";
import ShippingCart from "./components/ShippingCart";
import store from "./redux/store";

export default function App() {
    return (
        <Provider store={store}>
            <div className="w-scree h-scree p-10 bg-gray-100 text-slate-700">
                <ShippingCart/>

            </div>
        </Provider>
    );
}
