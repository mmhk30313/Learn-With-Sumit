export default function Message({ justify, message }) {
    return (
        <li className={`flex justify-${justify}`}>
            <div className={`${justify === "end" ? "bg-blue-500" : 'bg-gray-100'} shadow-md relative max-w-xl px-4 py-2 text-gray-700 rounded shadow`}>
                <span className={`${justify === "end" ? "text-white" : "text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-pink-600"} tracking-widest italic block`}>{message}</span>
            </div>
        </li>
    );
}
