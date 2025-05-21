import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Briefcase, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { loginUser } from "../../utils/auth-api-client";
import { useMutation } from "@tanstack/react-query";
import { vineResolver } from "../../utils/vine";
import { loginSchema } from "../../utils/loginSchema";
import { toast } from "react-toastify";
import useUserStore from "../../store/store";

export default function LoginPage() {
  const { setUser, user } = useUserStore((state) => state);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: vineResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (data?.success === false) {
        console.log(data);
        toast.error(data?.message || "Something went wrong");
        console.log(data);
      } else {
        toast.success(data?.message || "User login successfully");
        setUser({
          ...data?.user,
          accessToken: data?.accessToken,
          refreshToken: data?.refreshToken,
        });
        navigate("/dashboard", { replace: true });
      }
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      mutation.mutate(data);
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
            Enter your credentials to access your account
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
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  {...register("email")}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#2c4e85] focus:ring-1 focus:ring-[#2c4e85]"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-xs text-[#2c4e85] hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <input
                  id="password"
                  type="password"
                  {...register("password")}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#2c4e85] focus:ring-1 focus:ring-[#2c4e85]"
                />
              </div>
              {errors?.email?.message && (
                <p className="text-sm text-red-500">{errors.email?.message}</p>
              )}
              {errors?.password?.message && (
                <p className="text-sm text-red-500">
                  {errors.password?.message}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-md bg-[#2c4e85] px-4 py-2 text-sm font-medium text-white hover:bg-[#254170] focus:outline-none focus:ring-2 focus:ring-[#2c4e85] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading && <Loader2 className="mr-2 animate-spin" />}
                Login
              </button>
            </div>
          </form>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-[#2c4e85] hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
