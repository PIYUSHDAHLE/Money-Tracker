import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { forgotPasswordUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import {
  Input,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@heroui/react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const { loading, error } = useAppSelector((s) => s.auth);
  const [successMsg, setSuccessMsg] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await dispatch(forgotPasswordUser({ email })).unwrap();
      setSuccessMsg(res);
      setTimeout(() => nav("/reset-password"), 3000); 
    } catch (err) {
      console.error("Forgot password failed:", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-black">
      <Card className="w-full max-w-md p-4">
        <CardHeader className="flex justify-center">
          <h2 className="text-2xl font-semibold">Forgot Password</h2>
        </CardHeader>
        <form onSubmit={submit}>
          <CardBody className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {successMsg && (
              <p className="text-green-500 text-sm">{successMsg}</p>
            )}
          </CardBody>
          <CardFooter className="flex justify-end">
            <Button
              type="submit"
              color="primary"
              variant="shadow"
              isLoading={loading}
            >
              Send
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
