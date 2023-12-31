import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "../../react_tailwind/src/views/Login";
import Users from "../../react_tailwind/src/views/Users";
import Signup from "../../react_tailwind/src/views/SignUp";
import NotFound from "../../react_tailwind/src/views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "../../react_tailwind/src/views/Dashboard";
import UserForm from "../../react_tailwind/src/views/UserForm";

const router = createBrowserRouter([
    {
        path: '/',
        element:<DefaultLayout />,
        children: [
            {
                path: '/',
                element:<Navigate to="/" />
            },
            {
                path: '/dashboard',
                element:<Dashboard />
            },
            {
                path: '/users',
                element:<Users />
            },
            {
                path: '/user/new',
                element:<UserForm key='userCreate' />
            },
            {
                path: '/user/:id',
                element:<UserForm key='userUpdate' />
            },
        ]
    },
    {
        path: '/',
        element:<GuestLayout />,
        children:[
            {
                path: '/login',
                element:<Login />
            },
            {
                path: '/signup',
                element:<Signup />
            },            
        ]
    },
    {
        path: '*',
        element:<NotFound />
    },
])
export default router;