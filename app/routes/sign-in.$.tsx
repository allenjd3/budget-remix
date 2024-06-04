import { SignIn } from "@clerk/remix";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <SignIn />
    </div>
  );
}
