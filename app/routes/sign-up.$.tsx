import { SignUp } from "@clerk/remix";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <SignUp />
    </div>
  );
}
