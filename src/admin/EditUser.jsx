import React, { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { addRole, fetchUsers, removeRole } from '@/redux/features/AdminThunks';
import { editUser } from '@/redux/features/AdminThunks';
import { Loader2 } from 'lucide-react';

const EditUser = () => {

  const { userId } = useParams();
  const dispatch = useDispatch();
  const { allUsers, editing, roleAdded, roleRemoved} = useSelector((state) => state?.admin);

  const user = allUsers?.find((user) => user.id === userId)

  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState("");
  const [selectedRole, setSelectedRole] = useState("PLEASE_SELECT");


  const [formData, setFormData] = useState({
    firstName: user.firstName|| "",
    lastName: user.lastName || "",
    phoneNumber: user.phoneNumber || "",
    address: user.address || " ",
    zipcode: user.zipcode || "",
    city: user.city || "",
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleRemoveRole = async ({ userId, role }) => {
    try {
      const response = await dispatch(removeRole({ userId: userId, role: role })).unwrap();
      toast.success(response)
    } catch (error) {
      toast.error(error?.error || error?.message || "Failed to remove role..")
    }
  }

  const handleAddRole = async ({ userId, role }) => {

    if (role === "PLEASE_SELECT") {
      toast.error("Please select role first..");
      return;
    }

    try {
      const response = await dispatch(addRole({ userId: userId, role: role })).unwrap();
      toast.success(response);
    } catch (error) {
      toast.error(error?.error || error?.message || error|| "Failed to add role..")
    }
  }

  const handleSubmit = async () => {

    const data = new FormData();

    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("phoneNumber", formData.phoneNumber);
    data.append("address", formData.address);
    data.append("zipcode", formData.zipcode);
    data.append("city", formData.city);

    if (profilePic) {
      data.append("profilePic", profilePic);
    }

    try {
      const response = await dispatch(editUser({ userId, data })).unwrap();
      toast.success(response);
    } catch (error) {
      toast.error(error?.error || error?.message || "Failed to edit user..")
    }
  }

  useEffect(() => {
    const fetchUser = async() => {
      try {
        await(dispatch(fetchUsers())).unwrap();
      } catch (error) {
        toast.error(error?.error || error?.message || "Failed to fetch user..")
      }
    }
    fetchUser();
  }, [roleRemoved, roleAdded, editing])

  return (
    <div className='pt-16 sm:pt-20 min-h-screen mb-10 flex flex-col'>

      <div className='flex flex-col items-center bg-gray-100 rounded-2xl pb-6 mt-4'>

        <h1 className='font-bold mb-6 text-xl sm:text-2xl text-gray-800 mt-5'>
          EDIT USER
        </h1>

        <div className='w-full flex flex-col gap-6 md:gap-10 
          justify-center items-center bg-pink-50 px-4 sm:px-6 lg:px-10 max-w-5xl'>

          {/* Profile Image */}
          <div className='flex flex-col items-center w-full'>

            {
              preview ? (
                <img
                  src={preview}
                  className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-pink-400"
                />
              ) : user?.profilePic ? (
                <img
                  src={`${user.profilePic}`}
                  className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-pink-400"
                />
              ) : (
                <div className='w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex justify-center items-center rounded-full border-4 border-pink-400'>
                  No Image
                </div>
              )
            }

            <label className='cursor-pointer px-3 py-2 bg-pink-600 text-white mt-3 rounded-xl text-sm sm:text-base'>
              Change Profile
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

          </div>

          <div className='w-full space-y-4 shadow-lg p-4 sm:p-5 rounded-lg bg-white'>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>

              <div >
                <Label className="block text-sm font-medium">First Name</Label>
                <Input
                  type="text"
                  id="firstName"
                  onChange={handleOnChange}
                  value={formData.firstName}
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                />
              </div>

              <div>
                <Label className="block text-sm font-medium">Last Name</Label>
                <Input
                  type="text"
                  id="lastName"
                  onChange={handleOnChange}
                  value={formData.lastName}
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                />
              </div>

            </div>

            <div>
              <Label className="block text-sm font-medium">Email</Label>
              <Input type="email" value={user?.email || ""}
                className="w-full border rounded-lg px-3 py-2 mt-1" disabled />
            </div>

            <div>
              <Label className="block text-sm font-medium">Phone Number</Label>
              <Input
                type="text"
                id="phoneNumber"
                onChange={handleOnChange}
                value={formData.phoneNumber}
                className="w-full border rounded-lg px-3 py-2 mt-1"
              />
            </div>

            <div>
              <Label className="block text-sm font-medium">Address</Label>
              <Input
                type="text"
                id="address"
                onChange={handleOnChange}
                value={formData.address}
                className="w-full border rounded-lg px-3 py-2 mt-1"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="block text-sm font-medium">City</Label>
                <Input
                  type="text"
                  id="city"
                  onChange={handleOnChange}
                  value={formData.city}
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                />
              </div>

              <div>
                <Label className="block text-sm font-medium">Zipcode</Label>
                <Input
                  type="text"
                  id="zipcode"
                  onChange={handleOnChange}
                  value={formData.zipcode}
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                />
              </div>
            </div>

            <div>
              <h1 className='flex justify-center bg-gray-500 p-2 rounded-lg mb-4'>User Roles</h1>
              <div className='flex flex-col gap-5'>
                {
                  user.roles.map((role, index) => (
                    <div className='flex justify-between' key={index}>
                      <span>{role}</span>
                      <span onClick={() => handleRemoveRole({ userId: user.id, role: role })}
                        className='bg-pink-500 p-2 rounded-lg cursor-pointer'>
                        remove
                      </span>
                    </div>
                  ))
                }
              </div>
            </div>

            <div>
              <h1 className='flex justify-center bg-gray-500 p-2 rounded-lg mb-4'>ADD ROLES</h1>
              <div className='mt-5 flex flex-col sm:flx-row md:flex-row lg-flex-row gap-5 justify-between items-center'>
                <span>{selectedRole}</span>
                <select onChange={(e) => setSelectedRole(e.target.value)} className='p-2'>
                  <option value="PLEASE_SELECT">Role</option>
                  <option value="ROLE_USER">ROLE_USER</option>
                  <option value="ROLE_GUEST">ROLE_GUEST</option>
                  <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                </select>
                <button onClick={() => handleAddRole({ userId: user.id, role: selectedRole })}
                  className='bg-pink-500 p-2 rounded-lg cursor-pointer w-full'>
                  add
                </button>
              </div>
            </div>

            <button onClick={() => handleSubmit()}
              className="w-full bg-pink-600 hover:bg-pink-800 text-white py-3 sm:py-4 rounded-lg transition-all duration-300"
            >
              {
                editing ? <h1 className='flex justify-center items-center'><Loader2 /></h1> : "Edit User"
              }
            </button>

          </div>

        </div>
      </div>

    </div>
  );
};

export default EditUser;
