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
import { signUpWithEmail } from "@/lib/auth";

export default function SignUpModal({ open, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSignUp = async () => {
    const isValidPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/.test(password);
    if (!isValidPassword) {
      setError(
        "Password must include uppercase, lowercase, number, and symbol."
      );
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      await signUpWithEmail(email, password);
      setMessage("Verification email sent. Please check your inbox.");
    } catch (err) {
      setError(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-neutral-900 text-neutral-300 border-none gap-4">
        <DialogHeader className="text-center items-center justify-center">
          <div className="font-semibold text-md text-neutral-300 px-4 py-4 rounded-md text-center w-full max-w-xs mx-auto">
            Create an account to track your habits across devices and review
            your progress month by mohth.
          </div>
          <DialogTitle className="text-sm text-neutral-400 font-semibold">
            Sign Up
          </DialogTitle>
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
        <Input
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border-none bg-neutral-950/50"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {message && <p className="text-green-500 text-sm">{message}</p>}
        <DialogFooter className="flex flex-col items-center w-full">
          <Button
            onClick={handleSignUp}
            className="text-neutral-950 bg-neutral-200 hover:bg-neutral-300 flex items-center justify-center"
          >
            Register
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
