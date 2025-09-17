import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { resetPasswordUser } from "../store/authSlice";
import {
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@heroui/react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "./Login"; // ✅ reuse icons
import GlobalButton from "@/components/common/GlobalButton";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const emailFromLink = params.get("email") || "";
  const [email, setEmail] = useState(emailFromLink);
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const dispatch = useAppDispatch();
  const nav = useNavigate();

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () =>
    setIsConfirmVisible(!isConfirmVisible);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPass) {
      alert("Passwords do not match!");
      return;
    }
    try {
      await dispatch(resetPasswordUser({ email, password })).unwrap();
      alert("Password updated! Please login with your new password.");
      nav("/login");
    } catch (err) {
      alert("Failed: " + err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#1e88e5] via-[#42a5f5] to-[#90caf9] dark:from-black dark:via-gray-900 dark:to-gray-800">
      <Card className="w-full max-w-md p-4">
        <CardHeader className="flex justify-center">
          <h2 className="text-2xl font-semibold">Reset Password</h2>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardBody className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type={isVisible ? "text" : "password"}
              endContent={
                <button
                  aria-label="toggle password visibility"
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
            />

            <Input
              label="Confirm Password"
            
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              required
              type={isConfirmVisible ? "text" : "password"}
              endContent={
                <button
                  aria-label="toggle confirm password visibility"
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleConfirmVisibility}
                >
                  {isConfirmVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
            />
          </CardBody>
          <CardFooter className="flex flex-col space-y-2">
            <GlobalButton type="submit" className="w-full">Update Password</GlobalButton>
            <GlobalButton type="button" variant="light" className="w-full text-[#00a2ff]" onClick={() => nav("/login")}>
              Back to Login
            </GlobalButton>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
