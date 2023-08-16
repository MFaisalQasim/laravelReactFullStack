import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import Users from "./views/Users";
import Signup from "./views/SignUp";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import UserForm from "./views/UserForm";

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