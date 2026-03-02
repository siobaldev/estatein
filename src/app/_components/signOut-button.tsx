import { signOut } from "@/actions/auth";
import AnimatedButton from "../../components/ui/animated-button";
import { SignOutIcon } from "@phosphor-icons/react/dist/ssr";

export default function SignOutButton() {
  return (
    <form action={signOut}>
      <AnimatedButton
        type="submit"
        className="text-body flex items-center gap-x-1 text-red-400"
      >
        <SignOutIcon aria-hidden className="size-6" />
        Sign out
      </AnimatedButton>
    </form>
  );
}
