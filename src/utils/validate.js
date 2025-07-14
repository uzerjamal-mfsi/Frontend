export const validate = async (schema, fieldValues, setErrors) => {
  try {
    await schema.validate(fieldValues, { abortEarly: false });
    setErrors({});
    return true;
  } catch (err) {
    const errObj = {};
    if (err.inner) {
      err.inner.forEach((e) => {
        errObj[e.path] = e.message;
      });
    } else if (err.path) {
      errObj[err.path] = err.message;
    }
    setErrors(errObj);
    return false;
  }
};
