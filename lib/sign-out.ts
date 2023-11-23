import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const handleSignOut = async () => {
  const router = useRouter();
  await signOut();
  toast.success("Signed out successfully");
  router.push("/sign-in");
};
