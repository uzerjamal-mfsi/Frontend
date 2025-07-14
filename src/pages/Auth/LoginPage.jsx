import { Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../../services/auth/authService";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../lib/tokenStorage";
import { toast } from "react-toastify";
import * as yup from "yup";
import { validate as genericValidate } from "../../utils/validate";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = async (fieldValues = { email, password }) => {
    return await genericValidate(schema, fieldValues, setErrors);
  };

  const handleFieldChange = async (field, value) => {
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);
    await validate({
      email: field === "email" ? value : email,
      password: field === "password" ? value : password,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validate();
    if (!isValid) return;
    try {
      const response = await login({ email, password });
      setToken(response.data.token);
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed");
    }
  };

  const isSubmitDisabled =
    !email || !password || Object.keys(errors).length > 0;

  return (
    <Container maxWidth="sm" className="py-10">
      <Typography variant="h4" component="h1">
        Login
      </Typography>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => handleFieldChange("email", e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => handleFieldChange("password", e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitDisabled}
        >
          Login
        </Button>
        <Button
          variant="text"
          color="secondary"
          to="/register"
          component={Link}
        >
          Don't have an account? Register
        </Button>
      </form>
    </Container>
  );
}
