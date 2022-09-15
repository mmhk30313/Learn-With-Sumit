import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import Message from "./Message";
import { messagesApi, useGetMessagesQuery } from "../../../features/messages/messagesApi";

export default function Messages({ conversationId = null }) {
    const timelineRef = React.useRef();
    const {data} = useGetMessagesQuery(conversationId) || {};
    const { user } = useSelector((state) => state.auth) || {};
    const { email } = user || {};
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const { data: messages, totalCount } = data || {};
    const fetchMore = () => {
        setHasMore(true);
        timelineRef.current.scrollTo(0, timelineRef.current.scrollHeight);
        // console.log("fetching more messages");
        setTimeout(() => {
            setPage((prevPage) => prevPage + 1);
            setHasMore(false);
        }, 1000);

    };

    useEffect(() => {
        setPage(1);
    }, [conversationId]);

    useEffect(() => {
        console.log({page, totalCount});
        if (totalCount > 0) {
            // const more = Number(totalCount) > messages?.length;
            const more = 
                Math.ceil(
                    Number(totalCount) /
                        Number(process.env.REACT_APP_MESSAGES_PER_PAGE)
                ) > page;

            // console.log("more ====> ", more);
            setHasMore(more);
        }
    }, [page, totalCount]);

    useEffect(() => {
        if (page > 1) {
            dispatch(
                messagesApi.endpoints.getMoreMessages.initiate({
                    conversationId,
                    page,
                })
            );
        }
    }, [page, conversationId, dispatch]);

    // console.log({totalCount, page, hasMore, messages});

    return (

        // <div className="relative w-full p-6 flex flex-col-reverse">
        <div
            id="scrollableDiv"
            style={{ 
                height: "calc(100vh - 200px)", 
                // overflowY: "scroll", 
                overflow: "auto",
                display: "flex",
                flexDirection: "column-reverse"
            }}
            ref={timelineRef}
        >
            <InfiniteScroll
                    dataLength={messages.length}
                    className="relative w-full p-6 flex flex-col-reverse"
                    next={fetchMore}
                    inverse={true}
                    hasMore={hasMore}
                    loader={<h4 className="text-center">Loading...</h4>}
                    scrollableTarget="scrollableDiv"
                    // height={window.innerHeight - 197}
            >
                <ul className="space-y-2">
                    {messages
                        .slice()
                        .sort((a, b) => a.timestamp - b.timestamp)
                        .map((message) => {
                            const {
                                message: lastMessage,
                                id,
                                sender,
                            } = message || {};

                            const justify =
                                sender.email !== email ? "start" : "end";

                            return (
                                <Message
                                    key={id}
                                    justify={justify}
                                    message={lastMessage}
                                />
                            );
                        })}
                </ul>
            </InfiniteScroll>
        </div>
    );
}
