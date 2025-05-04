// app/login/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const handleSubmit = async () => {
    const { error, data } = isLogin
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });

    if (error) {
      alert(error.message);
    } else {
      alert(isLogin ? "Logged in!" : "Check your email to confirm registration");
      if (isLogin) router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md space-y-4 w-full max-w-sm">
        <h2 className="text-xl font-bold">{isLogin ? "Login" : "Sign Up"}</h2>
        {/* <input
          className="w-full p-2 border rounded"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        /> */}
        <input
          className="w-full p-2 border rounded"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="w-full p-2 border rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={handleSubmit} className="w-full p-2 bg-black text-white rounded">
          {isLogin ? "Login" : "Register"}
        </button>
        <button
          className="text-sm underline text-center block w-full"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "New here? Register" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
}
