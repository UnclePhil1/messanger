"use client";
import { Button } from "../../components/Button";
import { Input } from "../../components/inputs/input";
import React, { useCallback, useState, useEffect } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { AuthButton } from "./authSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Variant = "LOGIN" | "REGISTER";

export const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      console.log("Authenticated");
      router.push("/users");
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      //AXIOS
      axios
        .post("/api/register", data)
        .then(() => signIn('credentials', data))
        .then(() => {
          toast.success("Registration Successful!!");
        })
        .catch(() => {
          toast.error("SOMETHING WENT WRONG!");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    if (variant === "LOGIN") {
      //NEXTAUTH SIGIN
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid Credentials!");
          }
          if (callback?.ok && !callback?.error) {
            toast.success("LOGGIN SUCCESSFUL!!");
            router.push("/users");
          }
        })
        .catch(() => {
          toast.error("SOMETHING WENT WRONG!");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
    signIn(action, {
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid Credentials!");
        }
        if (callback?.ok && !callback?.error) {
          toast.success("Loggin Successful!!");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="w-[100%] h-full my-auto">
      <div className="rounded-md p-4 mx-auto">
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <div className="">
              <h2 className="text-center text-[1.2em] pb-8">
                Register and Join the Chat!
              </h2>
              <Input
                id="name"
                label="Name"
                register={register}
                errors={errors}
                disabled={isLoading}
              />
            </div>
          )}
          {variant === "LOGIN" && (
            <h2 className="text-center text-[1.2em] pb-8">
              Login and Join your Friends!
            </h2>
          )}

          <Input
            id="email"
            label="Email"
            type="email"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Button disabled={isLoading} fullWidth type="submit">
            {variant === "LOGIN" ? "SIGN IN" : "REGISTER NOW"}
          </Button>
        </form>
        <div className="flex flex-col items-center gap-[1rem] mt-5 md:mt-[5px]">
          <div className="flex gap-[1em] justify-center items-center">
            <div className="w-[60px] bg-gray-400 h-[1px]"></div>
            <p className="text-gray-600 text-[14px]">Or Continue With</p>
            <div className="w-[60px] bg-gray-400 h-[1px]"></div>
          </div>
          <div className="flex gap-4">
            <AuthButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
            <AuthButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div>
        </div>
        <div className="w-[100%] flex flex-col md:flex-row justify-center items-center pt-4">
          <div className="flex flex-col md:flex-row gap-2">
            <p className="flex flex-col md:flex-row justify-center items-center text-[15px] font-semibold text-gray-700">
              {variant === "LOGIN"
                ? "New To Messanger"
                : "Already have an Account?"}
            </p>
            <p
              onClick={toggleVariant}
              className="underline cursor-pointer text-[15px] text-primary"
            >
              {variant === "LOGIN"
                ? "Create an Account"
                : "Login to your Account?"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
