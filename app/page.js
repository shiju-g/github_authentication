"use client";

import { signIn, signOut } from "next-auth/react";
import { useSession, getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginIn } from "@/redux/features/auth-user";
import Link from "next/link";

export default function Home() {
  const { status } = useSession();
  const [githubStatus, setGitHubStatus] = useState(status);
  const dispatch = useDispatch();
  const user = useSelector((state) => state);

  useEffect(() => {
    setGitHubStatus(status);

    const fetchData = async () => {
      const session = await getSession();

      const response = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(loginIn(data));
      } else {
        console.error("Error fetching GitHub username:", response.statusText);
      }
    };

    fetchData();
  }, [status]);

  return (
    <>
      <header className="bg-gray-100 px-3 p-5 flex justify-between items-center">
        <div className="flex items-center justify-center">
          <h5 className="text-lg font-bold ml-2">GitHub</h5>
        </div>
        <div>
          {githubStatus === "unauthenticated" && (
            <button
              className="bg-black text-white py-1 font-bold rounded-lg px-3"
              onClick={() => signIn()}
            >
              Sign In
            </button>
          )}
          {githubStatus === "authenticated" && (
            <button
              className="bg-black text-white font-bold rounded-lg py-1 px-3"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          )}
          {githubStatus === "loading" && (
            <p className="font-bold">Loading...</p>
          )}
        </div>
      </header>
      {user.length != 0 && githubStatus === "authenticated" ? (
        <div className="max-w-3xl shadow-xl mt-20 sm:w-full w-10/12 mx-auto px-3 py-5 rounded-xl text-center bg-black text-white">
          <h1 className="font-medium text-3xl mb-2">Congragulations! 🎉</h1>
          <p className="text-xl mb-3">Your Github Dashboard is Ready</p>
          <Link
            className="bg-white text-lg hover:bg-black hover:border hover:border-white hover:text-white duration-150 text-black px-5 py-2 font-bold  rounded-xl"
            href="/dashboard"
          >
            Visit Now
          </Link>
        </div>
      ) : (
        <div className="max-w-3xl shadow-xl mt-20 sm:w-full w-10/12 mx-auto px-3 py-5 rounded-xl text-center bg-gray-300 text-black">
          <p className="text-xl mb-3">Signin with your Github account</p>
          <button
            className="bg-black text-white font-bold rounded-lg py-1 px-3"
            onClick={() => signIn()}
          >
            Sign In
          </button>
        </div>
      )}
    </>
  );
}
