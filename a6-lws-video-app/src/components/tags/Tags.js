import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTags } from "../../features/tags/tagsSlice";
import { resetAll } from "../../features/filter/filterSlice";
import { resetData } from "../../features/reset/resetSlice";

import Tag from "./Tag";

export default function Tags() {
    const { tags } = useSelector((state) => state.tags);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTags());
    }, [dispatch]);

    const handleReset = () => {
        dispatch(resetAll());
        dispatch(resetData(true));
    }

    return tags?.length > 0 ? (
        <section>
            <div className="flex flex-row lg:justify-between max-w-7xl mx-auto px-5 py-6 lg:px-0 flex gap-2 border-b overflow-y-auto">
                <div className="flex gap-2">
                    {tags.map((tag) => (
                        <Tag key={tag.id} title={tag.title} />
                    ))}
                </div>
                <button
                    className="bg-slate-100 shadow-md hover:bg-slate-200 text-slate-600 font-bold py-2 px-4 rounded-lg"
                    onClick={handleReset}
                >
                    RESET
                </button>
            </div>
        </section>
    ) : null;
}
