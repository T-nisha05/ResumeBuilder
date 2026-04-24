import React, { useState, useContext } from "react";
import Input from "./Input";
import { authStyles as styles } from "../assets/dummystyle";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../utils/helper";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

const SignUp = ({ setCurrentPage }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log("API URL:", import.meta.env.VITE_API_URL);
  console.log(import.meta.env);

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!fullName) {
      newErrors.fullName = "Full name is required";
    }

    if (!validateEmail(email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName: fullName,
        email,
        password,
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      // Optional: show global error if API fails
      setErrors({
        email: error.response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.headerWrapper}>
        <h3 className={styles.signupTitle}> Create Account </h3>
        <p className={styles.signupSubtitle}>
          {" "}
          Join thousands of professionals today
        </p>
      </div>

      {/* FORM */}
      <form onSubmit={handleSignUp} className={styles.signupForm}>
        <Input
          value={fullName}
          onChange={({ target }) => setFullName(target.value)}
          label="Full Name"
          placeholder="John Doe"
          type="text"
        />

        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">⚠ {errors.fullName}</p>
        )}

        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email"
          placeholder="email@example.com"
          type="email"
        />

        {errors.email && (
          <p className="text-red-500 text-sm mt-1">⚠ {errors.email}</p>
        )}

        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="Min 8 characters"
          type="password"
        />

        {errors.password && (
          <p className="text-red-500 text-sm mt-1">⚠ {errors.password}</p>
        )}

        <button type="submit" className={styles.signupSubmit}>
          Create Account
        </button>

        {/* FOOTER */}
        <p className={styles.switchText}>
          Already have an account?{" "}
          <button
            onClick={() => setCurrentPage("login")}
            type="button"
            className={styles.signupSwitchButton}
          >
            Sign In
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
