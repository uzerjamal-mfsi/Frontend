import { Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../../services/auth/authService";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ name, email, password });
      toast.success("Registration successful");
      navigate("/login");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <Container maxWidth="sm" className="py-10">
      <Typography variant="h4" component="h1">
        Register
      </Typography>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
        <Button variant="text" color="secondary" to="/login" component={Link}>
          Already have an account? Login
        </Button>
      </form>
    </Container>
  );
}
