import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signInWithEmail, signInWithGoogle } from "@/lib/auth";

export default function SignInModal({ open, onClose, onSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    try {
      await signInWithEmail(email, password);
      onClose();
    } catch (err) {
      setError(err);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      onClose();
    } catch (err) {
      setError(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-neutral-900 text-neutral-300 border-none">
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <DialogFooter className="flex flex-col items-center">
          <Button
            onClick={handleSignIn}
            className="text-neutral-950 bg-neutral-200 hover:bg-neutral-300 w-full"
          >
            Login
          </Button>
          <Button
            onClick={handleGoogleSignIn}
            className="mt-2 bg-blue-600 text-white hover:bg-blue-700 w-full"
          >
            Sign In
          </Button>
          <p className="text-sm text-neutral-400 mt-2">
            Don't have an account?{" "}
            <button
              onClick={onSignUp}
              className="text-blue-400 hover:underline"
            >
              Sign Up
            </button>
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
