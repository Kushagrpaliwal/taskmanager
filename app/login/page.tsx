"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Github } from "lucide-react";
import { useState, useEffect, FormEvent } from "react";
import { toast } from "sonner"
import { useRouter } from "next/navigation";

export default function LoginPage() {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const router = useRouter();

    const formsubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })

            const data = await res.json();

            if (!res.ok) {
                console.log("Login Failed")
                toast.error(data.error || "Unable to Login",
                    { position: "top-right", className: "bg-black text-white border-none" });
            } else {
                console.log("Login Successfull", data);
                toast.success("Login Success",
                    { position: "top-right", className: "bg-black text-white border-none" });
                router.push("/dashboard")
            }
        } catch (error) {
            console.log("There is some error reaching the login", error)
            toast.error("Unable to Login",
                { position: "top-right", className: "bg-black text-white border-none" });
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-sm border-0 shadow-none sm:border sm:border-border sm:shadow-sm">
                <CardHeader className="text-center pb-2 space-y-3">
                    <div className="flex justify-center mb-2">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-primary text-primary-foreground flex items-center justify-center rounded text-xs font-bold">F</div>
                            <span className="font-semibold text-lg">filOs</span>
                        </div>
                    </div>
                    <div>
                        <CardTitle className="text-xl font-bold">Log in to Filos</CardTitle>
                        <CardDescription className="text-muted-foreground mt-1 text-sm">
                            Welcome back. Please enter your details.
                        </CardDescription>
                    </div>
                </CardHeader>

                <CardContent className="space-y-4 pt-4">
                    {/* Social Login Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="rounded-sm h-9 border-border text-foreground hover:bg-secondary font-normal text-sm">
                            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Google
                        </Button>
                        <Button variant="outline" className="rounded-sm h-9 border-border text-foreground hover:bg-secondary font-normal text-sm">
                            <Github className="w-4 h-4 mr-2" />
                            GitHub
                        </Button>
                    </div>

                    <div className="relative my-2">
                        <div className="absolute inset-0 flex items-center">
                            <Separator className="w-full" />
                        </div>
                        <div className="relative flex justify-center text-[10px] uppercase">
                            <span className="bg-background px-2 text-muted-foreground">or</span>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={formsubmit} className="space-y-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="email" className="text-sm font-medium">
                                Email
                            </Label>
                            <Input
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="name@company.com"
                                className="rounded-sm h-9 border-border bg-transparent focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0 px-3"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-sm font-medium">
                                    Password
                                </Label>
                                <Link
                                    href="/forgot-password"
                                    className="text-xs text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="••••••••"
                                className="rounded-sm h-9 border-border bg-transparent focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0 px-3"
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox id="remember" className="rounded-[3px] border-muted-foreground/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                            <Label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer font-normal">
                                Remember me
                            </Label>
                        </div>

                        <Button type="submit" className="w-full h-9 rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-sm shadow-none mt-2">
                            Sign in
                        </Button>
                    </form>

                </CardContent>

                <CardFooter className="flex flex-col gap-4 pt-2 pb-6">
                    <p className="text-sm text-center text-muted-foreground">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="font-medium text-foreground hover:underline underline-offset-4">
                            Sign up
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
