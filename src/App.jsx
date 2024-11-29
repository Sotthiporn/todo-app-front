import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TodoPage from "./views/todo/page";
import AuthPage from "./views/auth/page";
import NotFoundPage from "./views/errors/404";
import useAuth from "./middleware/useAuth";
import redirectIfAuth from "./middleware/redirectIfAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route
                        path="/login"
                        element={
                            <RedirectIfAuthComponent>
                                <AuthPage />
                            </RedirectIfAuthComponent>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <TodoPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Router>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar
                newestOnTop={false}
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
                theme="light"
            />
        </>
    );
}

const RedirectIfAuthComponent = ({ children }) => {
    redirectIfAuth();
    return children;
};

const ProtectedRoute = ({ children }) => {
    useAuth();
    return children;
};

export default App;
