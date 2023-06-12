"use client";

import DashboardHeader from "@/components/DashboardHeader";
import GithubRepos from "@/components/GithubRepos";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((state) => state);

  const publicRepo = user?.authUser?.data?.public_repos;
  const privateRepo = user?.authUser?.data?.total_private_repos;
  const totalRepo = publicRepo + privateRepo;

  return (
    <div className="bg-gray-100 pb-4 min-h-screen">
      <DashboardHeader />
      <div className=" mt-16 sm:pt-10 pt-8 pb-8   w-11/12 mx-auto md:text-right text-center ">
        <Link
          className="bg-black font-semibold text-lg   duration-200 border-2 border-black rounded-lg p-3 text-white hover:bg-white hover:text-black "
          href="/dashboard/trending_repos"
        >
          View Trending Repos
        </Link>
      </div>

      <div className="lg:flex lg:w-10/12 w-11/12 mx-auto">
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
