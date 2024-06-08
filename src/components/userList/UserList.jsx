"use client";
import { useDeleteUserMutation, useGetUsersQuery } from "@/services/user";
import UserItem from "./userItem/UserItem";
import { useState } from "react";

const UserList = ({message,setMessage}) => {
  const { data: users = [], isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

    // const [message, setMessage] = useState(null);

    const handleDeleteUser = async (userId) => {
      try {
        // Perform deletion
        await deleteUser(userId);
        // Update message state on successful deletion
        setMessage({
          text: "User deleted successfully.",
          isErr: false,
          isDelete:true
        });
      } catch (error) {
        // Handle deletion error
        setMessage({
          text: "Failed to delete user.",
          isErr: true,
          isDelete: true,
        });
      }
    };

  // console.log("isLoading:",isLoading);

  // Testing
  // const users = []
  // const error = {message:"Error"};
  // const isLoading = false;

  // if(error){
  //   return <h2 className="text-xl text-red-400 text-center">{error.message}</h2>
  // }

  // if(isLoading){
  //   return <h2 className="text-xl">Loading ...</h2>
  // }

  return (
    <div className="user-list w-full">
      <h2 className="text-3xl text-center text-green-400 mb-3">Users</h2>

      {message.text && message.isDelete && (
        <small
          className={
            !message.isErr
              ? "text-green-400"
              : "text-red-400"
          }
        >
          {message.text}
        </small>
      )}

      {error ? (
        <h2 className="text-xl text-red-400 text-center">
          {error.message || "Something Went Wrong..."}
        </h2>
      ) : isLoading ? (
        <h2 className="text-xl text-center">Loading ...</h2>
      ) : users.length > 0 ? (
        <table className="border border-slate-500 w-full mt-3 text-center">
          <thead>
            <tr>
              <th className="border border-slate-500 font-medium text-blue-300">
                Username
              </th>
              <th className="border border-slate-500 font-medium text-blue-300">
                Email
              </th>
              <th className="border border-slate-500 font-medium text-blue-300">
                Password
              </th>
              <th
                colSpan={2}
                className="border border-slate-500 font-medium text-blue-300"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <UserItem
                key={user._id}
                user={user}
                handleDeleteUser={handleDeleteUser}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <h2 className="text-2xl text-center">No Users Are Available...</h2>
      )}

      {/* {isLoading && <div className="text-xl text-center">Loading...</div>}

      {!isLoading && !users?.length > 0 &&  (
        <h2 className="text-2xl text-center">No Users Are Available...</h2>
      )}

      {users?.length > 0 && (
        <table className="border border-slate-500 w-full mt-3 text-center">
          <thead>
            <tr>
              <th className="border border-slate-500 font-medium text-blue-300">
                Username
              </th>
              <th className="border border-slate-500 font-medium text-blue-300">
                Email
              </th>
              <th className="border border-slate-500 font-medium text-blue-300">
                Password
              </th>
              <th
                colSpan={2}
                className="border border-slate-500 font-medium text-blue-300"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users?.map((user) => <UserItem key={user._id} user={user} />)}
          </tbody>
        </table>
      )} */}
    </div>
  );
};

export default UserList;
