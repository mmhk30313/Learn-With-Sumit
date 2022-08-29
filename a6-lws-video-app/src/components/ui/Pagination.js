import { useDispatch, useSelector } from "react-redux";
import { fetchPageVideos } from "../../features/videos/videosSlice";
import leftArrow from "../../assets/left-arrow.png";
import rightArrow from "../../assets/right-arrow.png";

export default function Pagination() {
    const dispatch = useDispatch();
    const { totalVideos, limit, curPage } = useSelector((state) => state.videos);
    // console.log({totalVideos, limit});
    // const pages = Math.ceil(totalVideos / limit);
    const pages = Array.from(Array(Math.ceil(totalVideos / limit)).keys());
    // console.log({pages});
    const loadPageVideos = (page) => {
        dispatch(fetchPageVideos({ page, limit }));
    }

    return (
        <section className="pt-12">
            <div className="max-w-7xl mx-auto px-5 py-6 lg:px-0 flex gap-2 justify-end">
                <button
                    disabled={curPage === 0} 
                    onClick={() => loadPageVideos(curPage === 0 ? 0 : curPage - 1)}
                    className={`${curPage === 0 && "disabled:opacity-50 hover:cursor-no-drop"} flex items-center bg-blue-400 hover:bg-indigo-600 text-white px-2 py-1 rounded-full`}
                >
                    <img className="h-3 w-5" src={leftArrow} alt="right arrow" />
                </button>
                {
                    pages.map((page) => (
                        <div 
                            onClick={() => loadPageVideos(page)} 
                            key={page} 
                            className={`${page === curPage ? "bg-indigo-600" : "bg-blue-400"} hover:bg-indigo-600 text-white px-4 py-1 rounded-full cursor-pointer`}
                            >
                            {(page + 1)}
                        </div>
                    ))
                }
                <button
                    disabled={(curPage + 1) === pages?.length}
                    onClick={() => loadPageVideos(curPage + 1)}
                    className={`${(curPage + 1) === pages?.length && "disabled:opacity-50 hover:cursor-no-drop"} flex items-center bg-blue-400 hover:bg-indigo-600 text-white px-2 py-1 rounded-full`}
                >
                    <img className="h-3 w-5" src={rightArrow} alt="right arrow" />
                </button>
            </div>
        </section>
    );
}
