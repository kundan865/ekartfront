import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '@/redux/features/userSlice'
import { toast } from 'sonner'
import { fetchCart } from '@/redux/features/cartThunks'
import { login } from '@/redux/features/userThunks'
import { Loader2 } from 'lucide-react'

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { logging, user } = useSelector((state) => state?.user);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await dispatch(login(formData));

        const { accessToken, user } = response.payload || {};


        if (response.meta.requestStatus === "rejected") {
            const error = response.payload;
            toast.error(error);
        } else {
            localStorage.setItem("accessToken", accessToken);
            await dispatch(setUser(user));
            await dispatch(fetchCart(user?.id));
            toast.success("Login successfully...");
            navigate("/")
        }
    };

    return (
        <div className='flex justify-center items-center min-h-screen bg-pink-200 p-3'>
            <Card className="w-full max-w-sm">

                <div className='text-center text-2xl font-bold py-3'>
                    Log in
                </div>

                {/*FORM START */}
                <form onSubmit={handleSubmit}>
                    <CardContent>

                        <div className="flex flex-col gap-6">

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    onChange={handleChange}
                                    value={formData.email}
                                    placeholder="Enter your email..."
                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    onChange={handleChange}
                                    value={formData.password}
                                    placeholder="Enter your password..."
                                    required
                                />
                            </div>

                        </div>

                    </CardContent>

                    {/* NOW INSIDE FORM */}
                    <CardFooter className="flex flex-col gap-3">
                        <Button type="submit" className="w-full">
                            {
                                logging ? <Loader2 /> : "Login"
                            }
                        </Button>

                        <div className='flex gap-2 text-sm'>
                            <span>Don't have an account?</span>
                            <Link to="/signup" className="text-blue-600 hover:underline">
                                Signup
                            </Link>
                        </div>
                        <Link to={"/forgetPassword"} className="text-blue-600 hover:underline">
                            Forgot Password?
                        </Link>
                        
                    </CardFooter>

                </form>
                {/* FORM END */}

            </Card>
        </div>
    )
}

export default Login