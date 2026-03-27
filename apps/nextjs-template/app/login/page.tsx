import { redirect } from "next/navigation";
import { auth, signIn } from "../../auth";
import { Button } from "@repo/react-ui/components/button";

export default async function LoginPage() {
  const session = await auth();
  if (session) redirect("/capture");

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Thoughts</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Capture your thoughts. Let AI organize them.
          </p>
        </div>

        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/capture" });
          }}
        >
          <Button type="submit" className="w-full">
            Sign in with Google
          </Button>
        </form>
      </div>
    </div>
  );
}
