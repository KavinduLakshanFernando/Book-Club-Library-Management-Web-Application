import {createBrowserRouter} from "react-router-dom";
import Layout from "./pages/Layout.tsx";
import AdminRoutes from "./pages/AdminRoutes.tsx";
import DashBoard from "./pages/DashBoard.tsx";
import ReaderPage from "./pages/ReaderPage.tsx";
import BookPage from "./pages/BookPage.tsx";
import LendingPage from "./pages/LendingPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";



const router = createBrowserRouter([
    {path: "/", element: <Layout/>,
    children: [
        { path: "/", element: <LoginPage /> },
         { path: "/login", element: <LoginPage /> },
        //  { path: "/signup", element: <Signup /> },
        {element: <AdminRoutes/>,
        children: [
            {path: "/dashboard", element: <DashBoard/>},
            {path: "/dashboard/readers", element: <ReaderPage/>},
            {path: "/dashboard/books", element: <BookPage/>},
            {path: "/dashboard/lendings", element: <LendingPage/>},
        ]


        }
    ]
    }
])

export default router