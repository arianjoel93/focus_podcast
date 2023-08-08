//REACT
import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

//SKELETONS


//PAGES
const Login = lazy(() => import('../../Pages/Login/Login'))
const Register = lazy(() => import('../../Pages/Register/Register'))
const ConfirmUser = lazy(() => import('../../Pages/ConfirmUser/ConfirmUser'))
const RecoverPassword = lazy(() => import('../../Pages/RecoverPassword/RecoverPassword'))
const NewPassword = lazy(() => import('../../Pages/NewPassword/NewPassword'))




const LogRoutes = () => {

    return (
        <>
            <Routes>
                <Route
                    path="/login"
                    element={
                        <Suspense fallback={<></>}>
                            <Login />
                        </Suspense>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <Suspense fallback={<></>}>
                            <Register />
                        </Suspense>
                    }
                />
                <Route
                    path="/confirm/:token"
                    element={
                        <Suspense fallback={<></>}>
                            <ConfirmUser />
                        </Suspense>
                    }
                />
                <Route
                    path="/recover-password"
                    element={
                        <Suspense fallback={<></>}>
                            <RecoverPassword />
                        </Suspense>
                    }
                />
                <Route
                    path="/recover-password/:token"
                    element={
                        <Suspense fallback={<></>}>
                            <NewPassword />
                        </Suspense>
                    }
                />
            </Routes>
        </>
    );
};
export default LogRoutes;