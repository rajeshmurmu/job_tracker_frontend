import vine from "@vinejs/vine";

export const jobSchema = vine.object({
  company_name: vine.string().minLength(3).maxLength(255),
  position: vine.string().minLength(3).maxLength(255),
  location: vine.string().minLength(3).maxLength(255),
  status: vine.enum(["Applied", "Interview", "Rejected", "Offer", "Saved"]),
  applied_date: vine.date(),
  salary: vine.number().optional(),
  job_url: vine.string().optional(),
  notes: vine.string().optional(),
});
