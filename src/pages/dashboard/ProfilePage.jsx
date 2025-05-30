import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useUserStore from "../../store/store";
import { useMutation } from "@tanstack/react-query";
import {
  deleteAvatar,
  updateUser,
  uploadAvatar,
} from "../../utils/user-api-client";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { vineResolver } from "../../utils/vine";
import { updateSchema } from "../../utils/updateSchema";
import { queryClient } from "../../main";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, resetUser, setUser } = useUserStore((state) => state);
  const [avatar, setAvatar] = useState(user?.avatar);
  const avatarInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      current_password: "",
      new_password: "",
      new_password_confirmation: "",
    },
    resolver: vineResolver(updateSchema),
  });

  const { mutate, data, isPending, isSuccess, isError, error } = useMutation({
    mutationKey: ["upload-avatar"],
    mutationFn: uploadAvatar,
  });

  const {
    mutate: deleteAvatarMutate,
    data: deleteAvatarData,
    isSuccess: isSuccessDeleteAvatar,
    isError: isErrorDeleteAvatar,
    error: deleteAvatarError,
    isPending: isPendingDeleteAvatar,
  } = useMutation({
    mutationKey: ["delete-avatar"],
    mutationFn: deleteAvatar,
  });

  const {
    mutate: updateMutate,
    data: updateData,
    isSuccess: isSuccessUpdate,
    isError: isErrorUpdate,
    error: updateError,
    isPending: updating,
  } = useMutation({
    mutationKey: ["update-user"],
    mutationFn: updateUser,
  });
  const handleOnAvatarChange = async (e) => {
    const formData = new FormData();
    formData.append("avatar", e.target.files[0]);
    mutate(formData);
  };

  const onSubmit = async (data) => {
    updateMutate(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Avatar updated successfully");
      setAvatar(data?.avatar); // Update the avatar state with the new avatar;
      setUser(data?.user);
    }

    if (isError) {
      toast.error(error?.message || "Something went wrong");
    }
  }, [data, error, isError, isSuccess, setUser]);

  useEffect(() => {
    if (isSuccessUpdate) {
      toast.success(updateData?.message || "User updated successfully");
      setAvatar(updateData?.user?.avatar);
      setUser(updateData?.user);
    }

    if (isErrorUpdate) {
      toast.error(updateError?.message || "Something went wrong");
    }
    queryClient.invalidateQueries({ queryKey: ["me"] });
  }, [
    isErrorUpdate,
    isSuccess,
    isSuccessUpdate,
    navigate,
    resetUser,
    setUser,
    updateData,
    updateError,
  ]);

  useEffect(() => {
    if (isSuccessDeleteAvatar) {
      toast.success(deleteAvatarData?.message || "Avatar deleted successfully");
      setAvatar(deleteAvatarData?.user?.avatar);
      setUser(deleteAvatarData?.user);
    }

    if (isErrorDeleteAvatar) {
      toast.error(deleteAvatarError?.message || "Something went wrong");
    }

    queryClient.invalidateQueries({ queryKey: ["me"] });
  }, [
    deleteAvatarData,
    deleteAvatarError,
    isErrorDeleteAvatar,
    isSuccessDeleteAvatar,
    navigate,
    resetUser,
    setUser,
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
        <p className="text-slate-500">Manage your account settings</p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden max-w-3xll">
        <div className="p-4 border-b border-slate-200">
          <h3 className="font-medium">Personal Information</h3>
          <p className="text-sm text-slate-500">
            Update your personal information and account settings
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-4 space-y-6">
            <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4">
              <div className="relative h-24 w-24 rounded-full border-slate-300 border-1 bg-slate-200 flex items-center justify-center overflow-hidden">
                {(isPending || isPendingDeleteAvatar) && (
                  <div className="absolute inset-0 bg-slate-900/40 flex justify-center items-center">
                    <Loader2 className="animate-spin size-14" color="#2c4e85" />
                  </div>
                )}
                <img
                  src={
                    avatar ||
                    `https://avatar.iran.liara.run/username?username=${user?.name?.replace(
                      " ",
                      "+"
                    )}`
                  }
                  onClick={() => avatarInputRef.current.click()}
                  alt="Profile"
                  className="h-full w-full object-cover cursor-pointer"
                />
              </div>
              <div className="flex flex-col items-center sm:items-start gap-2">
                <h3 className="text-lg font-medium">Profile Picture</h3>
                <p className="text-sm text-slate-500">
                  Upload a new profile picture
                </p>
                <div className="flex gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    ref={avatarInputRef}
                    onChange={handleOnAvatarChange}
                  />
                  <button
                    type="button"
                    disabled={isPending || isPendingDeleteAvatar}
                    className="px-3 py-1 text-sm border border-slate-300 rounded-md hover:bg-slate-50 cursor-pointer"
                    onClick={() => avatarInputRef.current.click()}
                  >
                    Upload
                  </button>

                  <button
                    type="button"
                    disabled={
                      isPendingDeleteAvatar || !user?.avatar || isPending
                    }
                    className="px-3 py-1 text-sm border border-slate-300 rounded-md hover:bg-slate-50 cursor-pointer"
                    onClick={() => deleteAvatarMutate(user?.avatar)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>

            <hr className="border-slate-200" />

            <div className="space-y-2">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-slate-700"
              >
                Name
              </label>
              <input
                id="name"
                defaultValue={user?.name}
                {...register("name")}
                required
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
                defaultValue={user?.email}
                {...register("email")}
                required
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#2c4e85] focus:ring-1 focus:ring-[#2c4e85]"
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <hr className="border-slate-200" />

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Change Password</h3>
              <p className="text-sm text-slate-500">
                Update your password to keep your account secure
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="current_password"
                  className="block text-sm font-medium text-slate-700"
                >
                  Current Password
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  {...register("current_password")}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#2c4e85] focus:ring-1 focus:ring-[#2c4e85]"
                />

                {errors.current_password && (
                  <p className="text-xs text-red-500">
                    {errors.current_password.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="new_password"
                    className="block text-sm font-medium text-slate-700"
                  >
                    New Password
                  </label>
                  <input
                    id="new_password"
                    type="password"
                    {...register("new_password")}
                    className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#2c4e85] focus:ring-1 focus:ring-[#2c4e85]"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="new_password_confirmation"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Confirm New Password
                  </label>
                  <input
                    id="new_password_confirmation"
                    type="text"
                    {...register("new_password_confirmation")}
                    className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#2c4e85] focus:ring-1 focus:ring-[#2c4e85]"
                  />
                </div>

                {errors.new_password && (
                  <p className="text-xs text-red-500">
                    {errors.new_password.message}
                  </p>
                )}

                {errors.confirm_password && (
                  <p className="text-xs text-red-500">
                    {errors.new_password_confirmation.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end p-4 border-t border-slate-200">
            <button
              type="submit"
              disabled={isPending || updating}
              className="px-4 py-2 rounded-md text-sm font-medium text-white bg-[#2c4e85] hover:bg-[#254170] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2c4e85] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isPending ? (
                <>
                  <Loader2 className="inline mr-2 animate-spin size-4" />
                  <span> Saving...</span>
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
