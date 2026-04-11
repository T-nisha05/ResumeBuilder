import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { authStyles as styles } from "../assets/dummystyle";
import Input from "./Input";
import { validateEmail } from "../utils/helper";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validation
    let newErrors = {};

    if (!validateEmail(email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      // ONLY ONE API CALL
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, ...userData } = response.data;

      // Store token
      localStorage.setItem("token", token);

      // Set token globally
      axiosInstance.defaults.headers.common["Authorization"] =
        `Bearer ${token}`;

      // Normalize user
      const normalizedUser = {
        ...userData,
        name: userData.name || userData.fullName,
      };

      updateUser(normalizedUser);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);

      //  Show error under email
      setErrors({
        email: err.response?.data?.message || "Login failed",
        password: "",
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <h3 className={styles.title}>Welcome Back</h3>
        <p className={styles.subtitle}>
          Sign in to continue building amazing resumes
        </p>
      </div>

      <form onSubmit={handleLogin} className={styles.form}>
        <div className="flex flex-col">
          <Input
            label="Email"
            placeholder="john@example.com"
            type="email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            className={`w-full ${
              errors?.email ? "border-red-600 focus:border-red-500" : ""
            }`}
          />

          {errors?.email && (
            <div className="flex items-center gap-1 mt-1 text-red-500 text-md">
              <span className="w-3 h-3 flex items-center justify-center border border-red-600 rounded-full text-[9px]">
                !
              </span>
              <span>{errors.email}</span> {/* 👈 dynamic message */}
            </div>
          )}
        </div>

        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="Min 8 characters"
          type="password"
          autoComplete="current-password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">⚠ {errors.password}</p>
        )}

        <button type="submit" className={styles.submitButton}>
          Sign In
        </button>

        <p className={styles.switchText}>
          Don't have an account{" "}
          <button
            type="button"
            onClick={() => setCurrentPage("signup")}
            className={styles.switchButton}
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
