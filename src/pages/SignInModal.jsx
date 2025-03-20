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
import { FaGoogle } from "react-icons/fa";

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
      <DialogContent className="bg-neutral-900 text-neutral-300 border-none gap-4">
        <DialogHeader className="text-center items-center justify-center">
          <DialogTitle className="font-semibold">Sign In</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-none bg-neutral-950/50"
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-none bg-neutral-950/50"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <DialogFooter className="flex flex-col items-center w-full">
          <div className="flex w-full space-x-2">
            <Button
              onClick={handleSignIn}
              className="text-neutral-950 bg-neutral-200 hover:bg-neutral-300 flex-1 flex items-center justify-center"
            >
              Login
            </Button>
            <Button
              onClick={handleGoogleSignIn}
              className="bg-neutral-950 text-neutral-200 hover:bg-neutral-800 flex-1 flex items-center justify-center space-x-2"
            >
              <FaGoogle className="w-6 h-6" />
              Sign In with Google
            </Button>
          </div>
        </DialogFooter>
        <p className="flex items-center justify-center text-sm text-neutral-400">
          Don't have an account?{" "}
          <button
            onClick={onSignUp}
            className="text-neutral-200 hover:underline pl-1"
          >
            Sign Up
          </button>
        </p>
      </DialogContent>
    </Dialog>
  );
}
