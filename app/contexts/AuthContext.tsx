"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { authApi } from "@/lib/api/auth";
import {
  Moderator,
  LoginCredentials,
  RegisterData,
  AuthContextType,
} from "@/types/auth";
import { toast } from "sonner";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Moderator | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in on mount
    const token = Cookies.get("auth_token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        // Check if token is expired
        if (decoded.exp * 1000 < Date.now()) {
          Cookies.remove("auth_token");
          setUser(null);
        } else {
          // Set user from decoded token
          setUser({
            id: decoded.sub || decoded.id,
            email: decoded.email,
            status: "active",
          });
        }
      } catch (error) {
        Cookies.remove("auth_token");
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await authApi.login(credentials);

      // Store token in cookie (7 days expiry)
      Cookies.set("auth_token", response.access_token, {
        expires: 7,
        sameSite: "strict",
      });

      // Decode token to get user info
      const decoded: any = jwtDecode(response.access_token);
      setUser({
        id: decoded.sub || decoded.id,
        email: decoded.email,
        status: "active",
      });

      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (error: any) {
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const response = await authApi.register(data);

      toast.success("Registration successful! Please login");
      router.push("/login");
    } catch (error: any) {
      const message = error.response?.data?.message || "Registration failed";
      toast.error(message);
      throw error;
    }
  };

  const logout = () => {
    Cookies.remove("auth_token");
    setUser(null);
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
