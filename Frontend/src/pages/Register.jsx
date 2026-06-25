import { useDispatch } from "react-redux";
import { registerUser } from "../Thunks/authThunks.js";
import { useState } from "react";

function Register() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      await dispatch(registerUser(formData)).unwrap();

      setMessage("Registration successful. Please login");

      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (err) {
      setError(err || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-6 py-10">

        <div className="w-full max-w-md">

          <h2 className="text-3xl font-bold mb-6">Create account</h2>

          {/* Success Message */}
          {message && (
            <div className="mb-4 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
              {message}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3"
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3"
            />

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-500 py-3 font-semibold hover:bg-blue-600"
            >
              Create Account
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;