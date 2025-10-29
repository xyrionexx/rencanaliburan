import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { API_ENDPOINTS } from "@/config/api";

// Create axios instance with default config
const apiClient = axios.create({
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await apiClient.post(API_ENDPOINTS.LOGIN, {
            email: credentials?.email,
            password: credentials?.password,
          });

          const user = response.data;
          
          // Axios automatically throws for non-2xx status codes
          // So if we reach here, login was successful
          return user; // user = {id, name, email, provider, role}
        } catch (err) {
          console.error("Authorization error:", err);
          
          if (axios.isAxiosError(err)) {
            if (err.code === "ECONNABORTED") {
              console.error("Request timeout - check API_ENDPOINTS.LOGIN:", API_ENDPOINTS.LOGIN);
            } else if (err.response) {
              // Server responded with error status
              console.error("Server error:", err.response.status, err.response.data);
            } else if (err.request) {
              // Request made but no response received
              console.error("No response received from server");
            }
          }
          
          return null;
        }
      },
    }),
  ],

  callbacks: {
    // Ketika login berhasil
    async signIn({ user, account }) {
      try {
        // Cek apakah user sudah ada di Django
        const checkResponse = await apiClient.get(
          API_ENDPOINTS.CHECK_USER(user.email!)
        );
        const exists = checkResponse.data;

        if (!exists.exists) {
          // Jika belum, buat user baru di Django
          await apiClient.post(API_ENDPOINTS.REGISTER, {
            name: user.name,
            email: user.email,
            provider: account?.provider || "credentials",
            picture: user.image || "",
            role: "user",
          });
        }

        return true;
      } catch (err) {
        console.error("SignIn callback error:", err);
        
        if (axios.isAxiosError(err)) {
          console.error("Axios error details:", {
            message: err.message,
            code: err.code,
            response: err.response?.data,
          });
        }
        
        return false;
      }
    },

    // Tambah info ke session
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
  },

  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };