import io from "socket.io-client";
import { apiSlice } from "../api/apiSlice";

export const messagesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMessages: builder.query({
            query: (id) =>
                `/messages?conversationId=${id}&_sort=timestamp&_order=desc&_page=1&_limit=${process.env.REACT_APP_MESSAGES_PER_PAGE}`,
            transformResponse(apiResponse, meta) {
                const totalCount = meta.response.headers.get("X-Total-Count");
                return {
                    data: apiResponse,
                    totalCount,
                };
            },
            async onCacheEntryAdded(
                arg,
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
            ) {
                // create socket
                // const socket = io("http://localhost:9000", {
                const socket = io(process.env.REACT_APP_LIVE_URL || "http://localhost:9000", {
                    reconnectionDelay: 1000,
                    reconnection: true,
                    reconnectionAttemps: 10,
                    transports: ["websocket"],
                    agent: false,
                    upgrade: false,
                    rejectUnauthorized: false,
                });

                try {
                    await cacheDataLoaded;
                    socket.on("message", (data) => {
                        updateCachedData((draft) => {
                            console.log("message data ===> ", data?.data);
                            const message = draft.data.find(
                                (m) => m.id == data?.data?.id
                            );
                            console.log("message ===> ", message);
                            if (message?.id) {
                                message.senderName = data?.data?.senderName;
                                message.senderEmail = data?.data?.senderEmail;
                                message.message = data?.data?.message;
                                message.timestamp = data?.data?.timestamp;
                            } else {
                                draft.data.push(data?.data);
                            }
                        });
                            
                    });
                } catch (err) {}

                await cacheEntryRemoved;
                socket.close();
            },
        }),
        getMoreMessages: builder.query({
            query: ({ conversationId: id, page }) =>
                `/messages?conversationId=${id}&_sort=timestamp&_order=desc&_page=${page}&_limit=${process.env.REACT_APP_MESSAGES_PER_PAGE}`,
            async onQueryStarted({ conversationId: id }, { queryFulfilled, dispatch }) {
                try {
                    const previousMessages = await queryFulfilled;
                    if (previousMessages?.data?.length > 0) {
                        dispatch(
                            apiSlice.util.updateQueryData(
                                "getMessages",
                                id,
                                (draft) => {
                                    console.log("previousMessages ==59==> ", previousMessages);
                                    return {
                                        data: [
                                            ...previousMessages.data,
                                            ...draft.data,
                                        ],
                                        totalCount: Number(draft.totalCount),
                                    };
                                }
                            )
                        );
    
                    }
                } catch (error) {
                    console.log("error ===> ", error);
                }
            },
        }),
        addMessage: builder.mutation({
            query: (data) => {
                // console.log("data ===> ", data);
                
                return {
                    url: "/messages",
                    method: "POST",
                    body: data,
                }
            },
        }),
    }),
});

export const { useGetMessagesQuery, useAddMessageMutation } = messagesApi;
