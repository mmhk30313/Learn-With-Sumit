import { useDispatch, useSelector } from "react-redux";
import likeImage from "../../assets/like.svg";
import unlikeImage from "../../assets/unlike.svg";
import { 
    incrementVideoLikes, incrementVideoUnLikes, 
    updateCurrentVideo 
} from "../../features/video/videoSlice";

const convertKiloToMillion = (number) => {
    if(number > 999){
        return (number/1000).toFixed(2)+"K";
    } else if(number > 1000000){
        return (number/1000000).toFixed(2)+"M";
    } else if(number > 1000000000){
        return (number/1000000000).toFixed(2)+"B";
    } else if(number > 49){
        return (number/1000).toFixed(2)+"K";
    }
    return number;
}

export default function LikeUnlike() {
    const {video} = useSelector(state => state.video);
    const dispatch = useDispatch();
    // console.log("video === ", video);
    const handleIncrementLikes = () => {
        dispatch(incrementVideoLikes());
        dispatch(updateCurrentVideo({id: video.id, videoData: {...video, likes: video.likes+1}}));
    }
    
    const handleIncrementUnLikes = () => {
        dispatch(incrementVideoUnLikes());
        dispatch(updateCurrentVideo({id: video.id, videoData: {...video, unlikes: video.unlikes + 1}}));
    }

    return (
        <div className="flex gap-10 w-48">
            <div className="flex gap-1">
                <div className="shrink-0">
                    <img 
                        onClick={handleIncrementLikes}
                        className="w-5 block hover:cursor-pointer hover:opacity-50 transition-opacity duration-900" 
                        src={likeImage} 
                        alt="Like" 
                    />
                </div>
                <div className="text-sm leading-[1.7142857] text-slate-600">
                    {convertKiloToMillion(video?.likes)}
                </div>
            </div>
            <div className="flex gap-1">
                <div className="shrink-0">
                    <img 
                        onClick={handleIncrementUnLikes}
                        className="w-5 block hover:cursor-pointer hover:opacity-50 transition-opacity duration-900" 
                        src={unlikeImage} 
                        alt="Unlike" 
                    />
                </div>
                <div className="text-sm leading-[1.7142857] text-slate-600">
                    {convertKiloToMillion(video?.unlikes)}
                </div>
            </div>
        </div>
    );
}
