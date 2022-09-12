export default function TodoListLoader() {
    return <div className="w-full flex flex-row gap-2 mb-4 animate-pulse">
        <div className="flex flex-col w-full grow space-y-2">
            <p className="text-slate-200 text-[8px] bg-slate-200">
                Loading...
            </p>
            <span className="text-slate-200 text-[8px] mt-2 bg-slate-200">
                Loading...
            </span>
            <p className="text-slate-200 text-[8px] bg-slate-200">
                Loading...
            </p>
            <p className="text-slate-200 text-[8px] bg-slate-200">
                Loading...
            </p>
            <p className="text-slate-200 text-[8px] bg-slate-200">
                Loading...
            </p>
        </div>
    </div>
}
