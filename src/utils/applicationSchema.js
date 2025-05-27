import vine from "@vinejs/vine";

export const applicationSchema = vine.object({
  company_name: vine.string().trim().minLength(2).maxLength(255),
  position: vine.string().trim().minLength(3).maxLength(255),
  location: vine.string().trim().minLength(3).maxLength(255),
  status: vine.enum(["Applied", "Interview", "Rejected", "Offer", "Saved"]),
  applied_date: vine.date(),
  salary: vine.number().optional(),
  job_url: vine.string().trim().optional(),
  notes: vine.string().trim().optional(),
});
