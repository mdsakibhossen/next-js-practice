
"use client";
import { changeInput, resetForm } from "@/redux/features/users/usersSlice";
import { useAddUserMutation, useUpdateUserMutation } from "@/redux/services/user";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserForm = ({ message, setMessage }) => {
  // RTK Query
  const [
    addUser,
    {
      data: addMessage,
      isError: addIsError,
      isLoading: addIsLoading,
      isSuccess: addIsSuccess,
      error: addError,
    },
  ] = useAddUserMutation();
  const [
    updateUser,
    {
      data: updateMessage,
      isError: updateIsError,
      isLoading: updateIsLoading,
      isSuccess: updateIsSuccess,
      error: updateError,
    },
  ] = useUpdateUserMutation();

  // RTK
  const userStates = useSelector((store) => store.user);
  const {
    user: { username, email, password },
    editMode,
    editableUserId,
  } = userStates;
  const dispatch = useDispatch();

  // Handle messages based on RTK Query states
  useEffect(() => {
    if (addIsSuccess) {
      setMessage({
        text: addMessage?.message || "Successfully Added...",
        isErr: false,
        isDelete: false,
      });
      dispatch(resetForm());
    } else if (addIsError) {
      // console.log("addError?.data?.message:", addError?.data?.message);
      setMessage({
        text: addError?.data?.message || "Failed To Add...",
        isErr: true,
        isDelete: false,
      });
    }

    if (updateIsSuccess) {
      setMessage({
        text: updateMessage?.message || "Successfully Updated...",
        isErr: false,
        isDelete: false,
      });
      dispatch(resetForm());
    } else if (updateIsError) {
      setMessage({
        text: updateError?.data?.message || "Failed To Update...",
        isErr: true,
        isDelete: false,
      });
    }
  }, [
    addIsSuccess,
    addIsError,
    updateIsSuccess,
    updateIsError,
    addError,
    updateError,
    dispatch,
  ]);

  // Submit handler
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setMessage({
        text: "Please Fill All The Fields...",
        isErr: true,
        isDelete: false,
      });
      return;
    }

    const newUser = { username, email, password };
    
    editMode
      ? await updateUser({ id: editableUserId, user: newUser })
      : await addUser(newUser);
  };

  return (
    <div className="user-form w-full">
      <h2 className="text-3xl text-center text-green-400 mb-3">User Form</h2>
      <div>
        {message.text && !message.isDelete && (
          <small
            className={
              message.isErr
                ? "text-red-400 inline-block mb-1"
                : "text-green-400 inline-block mb-1"
            }
          >
            {message.text}
          </small>
        )}
      </div>
      <form onSubmit={submitHandler} className="flex flex-col gap-3 w-full">
        <input
          onChange={(e) =>
            dispatch(
              changeInput({ property: e.target.name, value: e.target.value })
            )
          }
          type="text"
          className="bg-transparent p-1.5 rounded outline-none border-2 border-slate-600 focus:border-green-400"
          placeholder="Username"
          name="username"
          value={username}
        />
        <input
          onChange={(e) =>
            dispatch(
              changeInput({ property: e.target.name, value: e.target.value })
            )
          }
          type="email"
          className="bg-transparent p-1.5 rounded outline-none border-2 border-slate-600 focus:border-green-400"
          placeholder="Email"
          name="email"
          value={email}
        />
        <input
          onChange={(e) =>
            dispatch(
              changeInput({ property: e.target.name, value: e.target.value })
            )
          }
          type="password"
          className="bg-transparent p-1.5 rounded outline-none border-2 border-slate-600 focus:border-green-400"
          placeholder="Password"
          name="password"
          value={password}
        />
        {editMode ? (
          <button
            className={`bg-green-500 w-max px-3 py-1 rounded-sm mx-auto transition-all hover:bg-green-600 focus:bg-green-800 ${
              updateIsLoading && "cursor-not-allowed"
            }`}
            disabled={updateIsLoading}
          >
            {updateIsLoading ? "Updating..." : "Update"}
          </button>
        ) : (
          <button
            className={`bg-blue-500 w-max px-3 py-1 rounded-sm mx-auto transition-all hover:bg-blue-600 focus:bg-blue-800 ${
              addIsLoading && "cursor-not-allowed"
            }`}
            disabled={addIsLoading}
          >
            {addIsLoading ? "Adding..." : "Add"}
          </button>
        )}
      </form>
    </div>
  );
};

export default UserForm;
