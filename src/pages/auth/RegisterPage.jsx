import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Briefcase, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../utils/auth-api-client";
import { toast } from "react-toastify";
import { vineResolver } from "../../utils/vine";
import { registerSchema } from "../../utils/registerSchema";
import useUserStore from "../../store/store";

export default function RegisterPage() {
  const { user } = useUserStore((state) => state);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      if (data?.success === false) {
        console.log(data);
        toast.error(data?.message || "Something went wrong");
      } else {
        toast.success(data?.message || "User registered successfully");
        navigate("/login", { replace: true });
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    resolver: vineResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      mutation.mutate({ ...data, confirmPassword: data.password });
    } catch (error) {
      console.error("Error registering user:", error);
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate, user]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-lg">
        <div className="space-y-1 text-center">
          <div className="flex items-center justify-center mb-2">
            <Briefcase className="h-10 w-10 text-[#2c4e85]" />
          </div>
          <h2 className="text-2xl font-bold">Job Tracker</h2>
          <p className="text-sm text-slate-500">
            Enter your credentials to create an account
          </p>
        </div>

        <div className="mt-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  {...register("name")}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#2c4e85] focus:ring-1 focus:ring-[#2c4e85]"
                />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  {...register("email")}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#2c4e85] focus:ring-1 focus:ring-[#2c4e85]"
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  placeholder="********"
                  {...register("password")}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#2c4e85] focus:ring-1 focus:ring-[#2c4e85]"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="confirm_password"
                  className="block text-sm font-medium text-slate-700"
                >
                  Confirm Password
                </label>

                <input
                  id="confirm_password"
                  type="text"
                  placeholder="********"
                  {...register("password_confirmation")}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#2c4e85] focus:ring-1 focus:ring-[#2c4e85]"
                />

                {errors.password && (
                  <p className="text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-md bg-[#2c4e85] px-4 py-2 text-sm font-medium text-white hover:bg-[#254170] focus:outline-none focus:ring-2 focus:ring-[#2c4e85] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoading && <Loader2 className="mr-2 animate-spin" />}
                Register
              </button>
            </div>
          </form>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="text-[#2c4e85] hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
