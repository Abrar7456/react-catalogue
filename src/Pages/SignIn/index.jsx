import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout";
import { ShoppingCartContext } from "../../Context";

function SignIn() {
  const context = useContext(ShoppingCartContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await context.handleSignIn(email, password);
    if (success) {
      navigate("/");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <Layout>
      
        <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white/10 backdrop-blur-md shadow-xl rounded-2xl p-8 border border-green-700/40">
          {/* Heading */}
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-white drop-shadow-md">
            Sign in to your account
          </h2>

          {/* Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-green-200"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-lg bg-green-950/70 border border-green-700 py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-green-200"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-lg bg-green-950/70 border border-green-700 py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
                placeholder="••••••••"
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-400 text-sm text-center font-medium">
                {error}
              </p>
            )}

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="w-full rounded-lg bg-green-700 hover:bg-green-600 py-2 text-white font-semibold shadow-lg transition"
              >
                Sign in
              </button>
            </div>
          </form>

          {/* Extra links */}
          <p className="mt-6 text-center text-sm text-green-200">
            Don’t have an account?{" "}
            <Link
              to="/sign-up"
              className="font-semibold text-green-400 hover:text-green-300"
            >
              Sign up
            </Link>
          </p>
        </div>
    </Layout>
  );
}

export default SignIn;
