import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import Users from "./views/Users";
import Signup from "./views/Signup";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import UserForm from "./views/UserForm";
import Survey from "./views/Survey";
import SurveyView from "./views/SurveyView";
// import SurveyViewUpdate from "./views/SurveyViewUpdate";

const router = createBrowserRouter([
    {
        path: '/',
        element:<DefaultLayout />,
        children: [
            {
                path: '/dashboard',
                element:<Navigate to="/" />
            },
            {
                path: '/',
                element:<Dashboard />
            },
            {
                path: '/survey',
                element:<Survey />
            },
            {
                path: '/survey/create',
                element:<SurveyView/>
            },
            // {
            //     path: '/survey/:slug',
            //     element:<SurveyViewUpdate/>
            // },
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