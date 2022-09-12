import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { live_server } from "../../utils/server.config";

export const apiSlice = createApi({
    // reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: live_server || "http://localhost:9000",
    }),
    tagTypes: ["todos", "todo", "CompletedTodos"],
    endpoints: (builder) => ({

        getTodos: builder.query({
            query: () => "/todos",
            // keepUnusedDataFor: 600,
            providesTags: ["todos"],
        }),
        getTodo: builder.query({
            query: (todoId) => `/todos/${todoId}`,
            providesTags: (result, error, arg) => [{ type: "todo", id: arg }],
        }),
        getTodosByCompletedStatus: builder.query({
            query: (completed) => `/todos?completed=${completed}`,
            providesTags: (result, error, arg) => [
                { type: "CompletedTodos", id: arg.id },
            ],
        }),
        getCompletedTodos: builder.query({
            query: ({ completed }) => {
                const queryString = `/todos?completed_like=${completed}`;
                return queryString;
            },
            providesTags: (result, error, arg) => [
                { type: "CompletedTodos", id: arg.id },
            ],
        }),
        addTodo: builder.mutation({
            query: ({data}) => ({
                url: "/todos",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["todos", "CompletedTodos"],
        }),
        editTodo: builder.mutation({
            query: ({ id, data }) => ({
                url: `/todos/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: (result, error, arg) => [
                "todos",
                "CompletedTodos",
                { type: "todo", id: arg.id },
                { type: "CompletedTodos", id: arg.id },
            ],
        }),
        deleteTodo: builder.mutation({
            query: (id) => ({
                url: `/todos/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, arg) => [
                "todos", 
                "CompletedTodos",
                { type: "CompletedTodos", id: arg.id }
            ],
        }),
        bulkUpdateStatus: builder.mutation({
            query: ({ ids, completed }) => ({
                url: `/todos?${ids?.map(id => "id_like=" + id).join("&")}`,
                method: "PATCH",
                body: { ids, completed },
            }),
            invalidatesTags: (result, error, arg) => [
                "todos",
                "CompletedTodos",
                ...arg.ids.map((id) => ({ type: "todo", id })),
                ...arg.ids.map((id) => ({ type: "CompletedTodos", id })),
            ],
        }),
    }),
});

export const {
    useBulkUpdateStatusMutation,
    useGetTodosQuery,
    useGetTodoQuery,
    useGetTodosByCompletedStatusQuery,
    useGetCompletedTodosQuery,
    useAddTodoMutation,
    useEditTodoMutation,
    useDeleteTodoMutation,
} = apiSlice;
