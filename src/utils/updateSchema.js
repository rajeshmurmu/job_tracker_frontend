import vine from "@vinejs/vine";

export const updateSchema = vine.object({
  name: vine.string().minLength(3),
  email: vine.string().email(),
  current_password: vine.string().minLength(8),
  new_password: vine.string().minLength(8).confirmed("password_confirmation"),
});
