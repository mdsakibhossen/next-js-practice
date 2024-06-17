"use client";
import { useDeleteUserMutation } from "@/redux/services/user";
import UserItem from "./userItem/UserItem";
import { useEffect } from "react";

const UserList = ({ message, setMessage, data, isLoading, error }) => {
 

  const [
    deleteUser,
    {
      data: deleteMessage,
      isSuccess: isDeleteSuccess,
      isLoading: isDeleting,
      error: deleteError,
      isError: isDeleteError,
    },
  ] = useDeleteUserMutation();

  useEffect(() => {
    if (isDeleting) {
      setMessage({
        text: "Deleting...",
        isErr: false,
        isDelete: true,
      });
    }
    if (isDeleteSuccess) {
      setMessage({
        text: deleteMessage?.message || "User deleted successfully.",
        isErr: false,
        isDelete: true,
      });
    } else if (isDeleteError) {
      setMessage({
        text: deleteError?.data?.message || "Failed To Delete.",
        isErr: true,
        isDelete: true,
      });
    }
  }, [isDeleting, isDeleteSuccess, isDeleteError]);

  const handleDeleteUser = async (userId) => {
    await deleteUser(userId);

    // console.log("message:",message);
    // try {
    //   // Perform deletion
    //   await deleteUser(userId);
    //   // Update message state on successful deletion
    //   setMessage({
    //     text: "User deleted successfully.",
    //     isErr: false,
    //     isDelete:true
    //   });
    // } catch (error) {
    //   // Handle deletion error
    //   setMessage({
    //     text: "Failed to delete user.",
    //     isErr: true,
    //     isDelete: true,
    //   });
    // }
  };

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
        <small className={message.isErr ? "text-red-400" : "text-green-400"}>
          {message.text}
        </small>
      )}

      {error ? (
        <h2 className="text-xl text-red-400 text-center">
          {error.message || "Something Went Wrong..."}
        </h2>
      ) : isLoading ? (
        <h2 className="text-xl text-center">Loading ...</h2>
      ) : data?.users.length > 0 ? (
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
            {data?.users?.map((user) => (
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
    </div>
  );
};

export default UserList;
