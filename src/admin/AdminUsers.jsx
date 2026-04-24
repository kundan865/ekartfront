import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { deleteUser, fetchUsers } from "@/redux/features/AdminThunks";

const AdminUsers = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [dispatched, setDispatched] = useState(null);
  const navigate = useNavigate();


  const { deleting, fetching } = useSelector((state) => state?.products);

  const user = useSelector((state) => state?.user?.user);

  const { allUsers } = useSelector((state) => state?.admin);


  const users = allUsers?.filter((u) => u?.id != user?.id);


  const filteredUsers = users?.filter((user) => {
    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      (user.firstName || "").toLowerCase().includes(searchText) ||
      (user.lastName || "").toLowerCase().includes(searchText) ||
      (user.email || "").toLowerCase().includes(searchText) ||
      (user.roles || []).some((r) =>
        r.toLowerCase().includes(searchText)
      );

    const matchesRole =
      !role || (user.roles || []).includes(role);
    return matchesSearch && matchesRole;
  });

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");

    if (!confirmDelete) return;
    try {
      const response = await dispatch(deleteUser(userId)).unwrap();

      setDispatched(Math.random());
      toast.success(response);
    } catch (error) {
      const message =
        typeof error === "string"
          ? error
          : error?.message || "Something went wrong";

      toast.error(message);
    }
  };

  useEffect(() => {

    const fetchallUsers = async () => {
      try {
        await dispatch(fetchUsers()).unwrap();
      } catch (error) {
        const message =
          typeof error === "string"
            ? error
            : error?.message || error?.error || "Something went wrong";

        toast.error(message);
      }
    }
    fetchallUsers();
  }, [dispatch, dispatched]);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Admin - Users</h1>

      <div className="flex justify-between pb-5">
        <div>
          <input type="text" placeholder="search here..." 
          className="p-2 w-30 lg:w-full border rounded-lg" onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div>
          <select onChange={(e) => setRole(e.target.value)} className="p-2 border rounded-lg">
            <option value="">All</option>
            <option value="ROLE_ADMIN">ROLE_ADMIN</option>
            <option value="ROLE_USER">ROLE_USER</option>
          </select>
        </div>
      </div>

      {fetching ? (
        <div className="flex justify-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <div className="flex flex-col gap-5">

          {
            filteredUsers?.map((user) => (
              <div
                key={user.id}
                className="bg-gray-700 text-white items-center p-4 rounded-xl shadow-md flex flex-col sm:flex-col lg:flex-row md:flex-row justify-between"
              >
                <div className="h-24 w-24">
                  {user?.profilePic ? (
                    <img
                      src={user.profilePic}
                      alt="profile"
                      className="object-cover h-full w-full rounded-full"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-gray-500 rounded-full text-xl font-bold">
                      {user?.firstName?.[0]?.toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="mt-2 pl-5 flex gap-2">
                  <h1 className="font-semibold pl-5">
                    {user?.firstName}
                  </h1>
                  <h1 className="font-semibold">{user?.lastName}</h1>
                </div>

                <div className="flex gap-7 mt-3">
                  <FaRegEdit size={25} onClick={() => navigate(`/dashboard/edit-user/${user.id}`)}
                    className="cursor-pointer text-blue-400" />

                  <Trash2 size={25} className="cursor-pointer text-red-400" onClick={() => handleDelete(user?.id)} />

                </div>
                <div className="flex gap-10 mt-3">
                  <button>orders</button>
                </div>
              </div>
            ))
          }

          {users?.length === 0 && (
            <p className="text-center mt-4 text-gray-500">
              No users found
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
