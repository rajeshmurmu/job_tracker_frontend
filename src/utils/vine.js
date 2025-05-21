import vine, { errors } from "@vinejs/vine";

export const vineResolver = (schema) => async (values) => {
  try {
    const validator = vine.compile(schema);
    const validatedData = await validator.validate(values);
    return { values: validatedData, errors: {} };
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      const errors = {};
      error.messages.forEach((message) => {
        errors[message.field] = {
          type: "validation",
          message: message.message,
        };
      });
      return { values: {}, errors };
    }
    return { values: {}, errors: { message: "Something went wrong" } };
  }
};
