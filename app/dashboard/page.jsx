"use client";

import GithubRepos from "@/components/GithubRepos";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const router = useRouter();
  const user = useSelector((state) => state);

  if (user?.authUser?.data?.name == "undefined") {
    router.push("/");
  }

  const publicRepo = user?.authUser?.data?.public_repos;
  const privateRepo = user?.authUser?.data?.total_private_repos;
  const totalRepo = publicRepo + privateRepo;

  return (
    <div className="bg-gray-100 pb-4 min-h-screen">
      <header className="p-5 fixed z-50 top-0 left-0 w-full shadow  bg-white ">
        <h1 className="font-semibold text-xl text-center">
          Welcome to Dashboard
        </h1>
      </header>

      <div className="lg:flex mt-16 sm:pt-10 pt-5  lg:w-10/12 w-11/12 mx-auto">
        <div className="lg:w-96  w-full h-full">
          <h1 className="text-center mb-2 text-lg font-medium">
            Profile Details
          </h1>
          <div className=" bg-white w-full lg:mb-0 mb-4 items-center py-4 px-10  h-fit  rounded-xl shadow-lg">
            <img
              className="sm:w-36 sm:h-36 w-20 h-20 mx-auto rounded-full"
              src={user?.authUser?.data?.avatar_url}
              alt="avatar"
            />
            <div className="ml-3 text-center mt-2">
              <h1 className="font-bold text-xl">
                {user?.authUser?.data?.name}
              </h1>
              <p className="font-semibold ">Id: {user?.authUser?.data?.id}</p>
              <p className="">
                Followers -{" "}
                <span className="font-semibold text-gray-600">
                  {user?.authUser?.data?.followers}
                </span>
              </p>
            </div>
          </div>
        </div>
        {user.length != 0 && (
          <GithubRepos
            totalRepo={totalRepo}
            publicRepo={publicRepo}
            privateRepo={privateRepo}
            userName={user.authUser.data?.login}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
