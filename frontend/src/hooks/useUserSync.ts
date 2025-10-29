import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { API_ENDPOINTS } from "@/config/api";

/**
 * Custom hook to automatically sync NextAuth user to Django database
 * This ensures users who login via GitHub/Google/Email are created in Django
 */
export function useUserSync() {
  const { data: session, status } = useSession();

  useEffect(() => {
    const syncUser = async () => {
      // Only sync when authenticated and have user data
      if (status !== "authenticated" || !session?.user?.email) {
        return;
      }

      try {
        const response = await fetch(API_ENDPOINTS.SYNC_USER, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: session.user.email,
            name: session.user.name || session.user.email?.split("@")[0],
            provider: "nextauth",
          }),
        });

        if (!response.ok) {
          console.error("Failed to sync user to Django");
          return;
        }

        const data = await response.json();
        
        if (data.created) {
          console.log("✅ User created in Django database:", data.user);
        } else {
          console.log("✅ User already exists in Django database:", data.user);
        }
      } catch (error) {
        console.error("Error syncing user:", error);
      }
    };

    syncUser();
  }, [session, status]);

  return { session, status };
}
