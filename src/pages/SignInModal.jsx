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
import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

export default function SignInModal({ open, onClose, onSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      if (!user.emailVerified) {
        setError("Please veridy your email before logging in.");
        return;
      }
      onClose();
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  //   const handleGoogleSignIn = async () => {
  //     const provider = new GoogleAuthProvider();
  //     try {
  //       await signInWithPopup(auth, provider);
  //       onClose();
  //     } catch (err) {
  //       setError("Google sign-in failed. Try again.");
  //     }
  //   };

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
