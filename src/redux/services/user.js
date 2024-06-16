
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
                    body: user // Don't need to stringify. Because RTK Query Done The Job Underhood... 
                }
            ),
            invalidatesTags: ["user"]
        }),
        updateUser: builder.mutation({
            query: ({id,user}) => (
                {
                    url: `/users/${id}`,
                    method:"PUT",
                    body: user // Don't need to stringify. Because RTK Query Done The Job Underhood... 
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