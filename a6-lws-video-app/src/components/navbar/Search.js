import { 
    useEffect, 
    // useRef, 
    useState 
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMatch, useNavigate } from "react-router-dom";
import { searched } from "../../features/filter/filterSlice";
import { resetData } from "../../features/reset/resetSlice";

export default function Search() {
    const dispatch = useDispatch();
    const { search } = useSelector((state) => state.filter);
    const {isReset} = useSelector((state) => state.reset);
    const [input, setInput] = useState(search);
    // const inputRef = useRef(null);
    const match = useMatch("/");
    const navigate = useNavigate();

    useEffect(() => {
        // console.log({isReset});
        if(search !== input) {
            setInput("");
            // inputRef.current.value = "";
            dispatch(resetData(false));
        }
    } , [search, isReset]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(searched(input));

        // if user is not in home page, redirect to home page
        if (!match) {
            navigate("/");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                className="outline-none border-none mr-2"
                type="text"
                name="search"
                placeholder="Search"
                // ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
        </form>
    );
}
