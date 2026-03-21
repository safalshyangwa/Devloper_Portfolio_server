

export const validateMiddleware = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
  

    if (!result.success) {
      return res.status(400).json({
        errors: result.error.format(),
      });
    }

    // attach validated data
    req.validatedData = result.data;

    next();
  };
};