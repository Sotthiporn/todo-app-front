import { useState } from "react";
import { login, register } from "@/views/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function AuthForm() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPending, setIsPending] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsPending(true);
        setErrorMessage("");

        try {
            if (isLogin) {
                await login(email, password);
                toast.success("Login successful!");
            } else {
                await register(email, password);
                toast.success("Registration successful!");
            }
            navigate("/");
        } catch (error) {
            setErrorMessage(
                error?.data?.message
                    ? error.data.message
                    : "An error occurred. Please try again."
            );
        } finally {
            setIsPending(false);
        }
    };

    const handleSetLogin = () => {
        setIsLogin(!isLogin);
    };

    const handleInputChange = (e) => {
        setErrorMessage("");
        if (e.target.name === "email") {
            setEmail(e.target.value);
        } else if (e.target.name === "password") {
            setPassword(e.target.value);
        }
    };

    return (
        <div className="grid gap-6">
            <form onSubmit={handleSubmit}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>
                        {isPending ? (
                            <Skeleton className="h-10 w-full" />
                        ) : (
                            <Input
                                id="email"
                                placeholder="name@example.com"
                                type="email"
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"
                                name="email"
                                value={email}
                                onChange={handleInputChange}
                                required
                            />
                        )}
                    </div>
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="password">
                            Password
                        </Label>
                        {isPending ? (
                            <Skeleton className="h-10 w-full" />
                        ) : (
                            <Input
                                id="password"
                                placeholder="Password"
                                type="password"
                                name="password"
                                value={password}
                                onChange={handleInputChange}
                                required
                            />
                        )}
                    </div>
                    <Button type="submit" disabled={isPending}>
                        {isPending ? (
                            <Skeleton className="h-5 w-20" />
                        ) : isLogin ? (
                            "Sign In"
                        ) : (
                            "Sign Up"
                        )}
                    </Button>
                </div>
            </form>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <div className="text-center text-sm">
                {isLogin
                    ? "Don't have an account? "
                    : "Already have an account? "}
                <button
                    className="underline"
                    onClick={handleSetLogin}
                    disabled={isPending}
                >
                    {isLogin ? "Sign Up" : "Sign In"}
                </button>
            </div>
        </div>
    );
}
