// token?:{accessToken:string; exp:date; }, success: boolean, error?: string

import { useEffect, useState } from "react";
import { hash, compare, encrypt, decrypt } from "./bcrypt";
import useLocalStorage from "use-local-storage";

type LocalStorageSession = {
  accessToken?: Record<number, number>;
};

type Session = {
  email: String;
  password: String;
  exp: number;
};

export const useLogin = () => {
  const [user] = useLocalStorage("user", {
    email: "",
    password: "",
  });
  const [, setSession] = useLocalStorage<LocalStorageSession>("session", {});

  const [isError, setIsError] = useState<string>();
  const [isSuccess, setIsSuccess] = useState<string>();

  return {
    mutate: ({ email, password }: { email: string; password: string }) => {
      if (email == user.email && compare(password, user.password)) {
        setIsSuccess("Login successful! Redirecting...");

        setTimeout(() => {
          const accessToken = encrypt({
            email,
            password: user.password,
            exp: Date.now() + twentyFourHoursInMilliseconds,
          });
          setSession({ accessToken });
          setIsError(undefined);
          setIsSuccess(undefined);
        }, 2000);

        return {
          data: { success: true },
        };
      } else {
        setIsError("Wrong credentials");
        setTimeout(() => setIsError(undefined), 3000);
      }
    },
    isError,
    isSuccess,
  };
};

const twentyFourHoursInMilliseconds = 24 * 60 * 60 * 1000;

export const useSignUp = () => {
  const [user, setUser] = useLocalStorage("user", {
    email: "",
    password: "",
  });
  const [isError, setIsError] = useState<string>();

  return {
    mutate: ({ email, password }: { email: string; password: string }) => {
      const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      const isPasswordValid = password.length >= 10;
      if (user.email === email) {
        setIsError("Email already exists!");
        setTimeout(() => setIsError(undefined), 3000);
        return undefined;
      }
      if (!isEmailValid) {
        setIsError("String is not an email");
        setTimeout(() => setIsError(undefined), 3000);
        return undefined;
      }

      if (!isPasswordValid) {
        setIsError("Password must be atleast 10 characters");
        setTimeout(() => setIsError(undefined), 3000);
        return undefined;
      }

      const hashedPassword = hash(password);
      console.log("hashedPassword", hashedPassword);
      setUser({ email, password: hashedPassword });

      return {
        data: {
          email,
          password,
        },
      };
    },
    isError,
  };
};

export const useLogout = () => {
  const [_, setSession] = useLocalStorage<LocalStorageSession>("session", {});
  return {
    mutate: () => {
      setSession(undefined);
    },
  };
};

export const useIsAuthourized = () => {
 

  const [session] = useLocalStorage<LocalStorageSession>("session", {});

  if (!session?.accessToken) {
    return false;
  }

  const accessTokenToArray = Object.values(session.accessToken);

  const arrayToUint8Array = new Uint8Array(accessTokenToArray);

  return session.accessToken
    ? decrypt(arrayToUint8Array).exp > Date.now()
    : false;
};
