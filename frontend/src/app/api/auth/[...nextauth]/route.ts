import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";



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
      const res = await fetch("http://api.borrowfy.site/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: credentials?.email,
          password: credentials?.password,
        }),
      });

      const user = await res.json();
      if (!res.ok) throw new Error(user.error || "Login gagal");

      return user; // user = {id, name, email, provider, role}
    } catch (err) {
      console.error(err);
      return null;
    }
  },
})

  ],

  callbacks: {
    // Ketika login berhasil
    async signIn({ user, account }) {
      try {
        // Cek apakah user sudah ada di Django
        const check = await fetch(
          `http://api.borrowfy.site/api/users/check/?email=${user.email}`
        );
        const exists = await check.json();

        if (!exists.exists) {
          // Jika belum, buat user baru di Django
          await fetch("http://api.borrowfy.site/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: user.name,
              email: user.email,
              provider: account?.provider || "credentials",
              picture: user.image || "",
              role: "user",
            }),
          });
        }

        return true;
      } catch (err) {
        console.error("SignIn callback error:", err);
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
