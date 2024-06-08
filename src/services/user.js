
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
    tagTypes: ["user"],
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => "/users",
            providesTags: ["user"]
        }),
        addUser: builder.mutation({
            query: (user) => (
                {
                    url: "/users",
                    method:"POST",
                    body: user
                }
            ),
            invalidatesTags: ["user"]
        }),
        updateUser: builder.mutation({
            query: ({id,user}) => (
                {
                    url: `/users/${id}`,
                    method:"PUT",
                    body: user
                }
            ),
            invalidatesTags: ["user"]
        }),
        deleteUser: builder.mutation({
            query: (id) => (
                {
                    url: `/users/${id}`,
                    method: "DELETE",
                }
            ),
            invalidatesTags: ["user"]
        }),
    }),
})


export const { useGetUsersQuery,useAddUserMutation, useUpdateUserMutation,useDeleteUserMutation } = userApi