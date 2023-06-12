"use client";

import React, { useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import { useSelector } from "react-redux";
import Link from "next/link";

const Trend = () => {
  const repos = useSelector((state) => state.trendingRepos);
  const trend = repos.repo?.items?.slice(0, 10);
  const [details, setDetails] = useState({ data: false, id: 0 });

  console.log(trend);

  return (
    <div className="bg-gray-100  min-h-[92vh]">
      <DashboardHeader />
      <div className="xl:w-9/12 lg:w-10/12 w-11/12 mx-auto  ">
        <h3 className="mt-16  mb-3 font-semibold text-center pt-5">
          {trend ? " Trending Repos" : ""}
        </h3>
        {trend &&
          trend.map((repo, i) => (
            <div
              className="cursor-pointer duration-300 bg-white w-full rounded-md border-b mb-2 shadow-sm drop-shadow-sm border-gray-100 sm:px-5 px-2 py-3 "
              onClick={() =>
                setDetails((prev) => {
                  return { id: repo.id, data: !prev.data };
                })
              }
            >
              <div
                className="md:flex md:flex-row flex-col md:items-center md:justify-between "
                key={repo.id}
              >
                <h2 className="lg:text-2xl text-inherit  md:text-xl font-bold text-gray-700">
                  {repo.name}
                </h2>

                <div className="flex md:mt-0 mt-2 w-fit md:ml-0 ml-auto">
                  {repo.language && (
                    <p className="text-xs bg-gray-100 font-semibold shadow px-2 py-1 rounded-xl">
                      {repo.language}
                    </p>
                  )}
                  <p
                    style={{ borderRadius: "10px" }}
                    className="text-xs font-normal bg-green-100 px-2 py-1 ml-3 "
                  >
                    {repo.visibility}
                  </p>
                </div>
              </div>
              {details.data && details.id === repo.id && (
                <div className="rounded-lg shadow p-2 mt-2 bg-slate-50 ">
                  <h2 className="text-center text-lg font-semibold my-2">
                    Owner Details
                  </h2>
                  <div className="items-center gap-3 flex justify-center flex-wrap">
                    <img
                      src={repo.owner?.avatar_url}
                      className="md:w-14 w-10 rounded-full"
                      alt=""
                    />
                    <p className="text-base font-medium">
                      name: {repo.owner?.login}
                    </p>
                    <p className="p-2 text-sm bg-green-100 rounded-lg">
                      watchers: {repo.watchers}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        {!trend && (
          <div className="bg-white max-w-sm px-3 pt-5 pb-8 rounded-xl mx-auto mt-20 text-center shadow">
            <p className="font-semibold text-gray-600 text-2xl mb-5">
              Session Ended
            </p>
            <Link
              className="bg-black font-semibold text-sm   duration-200 border-2 border-black rounded-lg p-3 text-white "
              href="/"
            >
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trend;
