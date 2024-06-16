"use client";
import { editUser } from "@/redux/features/users/usersSlice";
import { FaRegEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { useDispatch } from "react-redux";

const UserItem = ({ user,handleDeleteUser }) => {
  const { username, email, password } = user;
  // const [deleteUser] = useDeleteUserMutation()
  const dispatch = useDispatch()
  return (
    <tr>
      <td className="border border-slate-500">{username}</td>
      <td className="border border-slate-500">{email}</td>
      <td className="border border-slate-500">{password}</td>
      <td className="border border-slate-500">
        <button
          onClick={() => dispatch(editUser(user))}
          className="text-green-400"
        >
          <FaRegEdit />
        </button>
      </td>
      <td className="border border-slate-500">
        <button onClick={() => handleDeleteUser(user._id)} className="text-red-400">
          <FaTrashCan />
        </button>
      </td>
    </tr>
  );
};

export default UserItem;
