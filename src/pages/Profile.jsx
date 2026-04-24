import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '@/redux/features/userThunks';
import { toast } from 'sonner';
import MyOrders from './MyOrders';

const Profile = () => {

  const { userId } = useParams();
  const dispatch = useDispatch();
  const { updated, updating, user } = useSelector((state) => state.user);

  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    phoneNumber: user.phoneNumber || "",
    address: user.address || "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    const response = await dispatch(updateProfile({ userId: userId, data: data }));

    if (response.meta.requestStatus === "rejected") {
      const error = response.payload?.error;
      toast.error(error)
    } else {
      toast.success("profile updated successfully...")
    }
  };


  return (
    <div className='pt-16 sm:pt-20 min-h-screen mb-10 px-2'>
      <Tabs defaultValue="profile" className="max-w-7xl mx-auto">

        <TabsList className="flex justify-center">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className='flex flex-col items-center bg-gray-100 rounded-2xl pb-6 mt-4'>

            <h1 className='font-bold mb-6 text-xl sm:text-2xl text-gray-800 mt-5'>
              Update Profile
            </h1>

            <div className='w-full flex flex-col md:flex-row gap-6 md:gap-10 
                            justify-center items-center md:items-start 
                            px-4 sm:px-6 lg:px-10 max-w-5xl'>

              {/* Profile Image */}
              <div className='flex flex-col items-center w-full md:w-1/3'>

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

              <form
                onSubmit={handleSubmit}
                className='w-full md:w-2/3 space-y-4 shadow-lg p-4 sm:p-5 rounded-lg bg-white'
              >

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
                    type="tel"
                    id="phoneNumber"
                    pattern="[1-9]{1}[0-9]{9}"
                    maxLength={10}
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

                <Button
                  type="submit"
                  className="w-full bg-pink-600 hover:bg-pink-800 text-white py-3 sm:py-4 rounded-lg transition-all duration-300"
                >
                  {
                    updating ? "Updating..." : "Update Profile"
                  }

                </Button>

              </form>

            </div>
          </div>
        </TabsContent>

        {/* ================= ORDERS TAB ================= */}
        <TabsContent value="orders">
          <MyOrders/>
        </TabsContent>

      </Tabs>
    </div>
  );
};

export default Profile;
