import React from "react";
import { useEffect, useState } from "react";

const GithubRepos = ({ userName, totalRepo, publicRepo, privateRepo }) => {
  const [repos, setRepos] = useState([]);
  const [rederData, setRenderData] = useState();
  useEffect(() => {
    if (userName) {
      const fetchRepos = async () => {
        try {
          const response = await fetch(
            `https://api.github.com/users/${userName}/repos`
          );
          if (response.ok) {
            const data = await response.json();
            setRepos(data);
            setRenderData(data);
          } else {
            throw new Error("Error fetching repositories");
          }
        } catch (error) {}
      };

      fetchRepos();
    }
  }, []);
  const clonedRepos = structuredClone(repos);
  const FilterRepo = (e) => {
    const query = e.target.value.toLowerCase();

    let filteredData;
    if (query === "") {
      filteredData = clonedRepos;
    } else {
      filteredData = clonedRepos.filter((repo) => {
        const name = repo.name.toLowerCase();
        return name.startsWith(query);
      });
    }

    if (filteredData.length !== 0) {
      setRenderData(filteredData);
    } else {
      setRenderData(repos);
    }
  };

  return (
    <div className="w-full xl:ml-16 lg:ml-12">
      <div className="xl:w-10/12 lg:w-11/12  w-full">
        <div className="flex justify-center gap-2 mb-4 mt-1 text-sm">
          <p className="bg-green-200  font-bold rounded-xl px-2 py-1">
            Total: {totalRepo}
          </p>
          <p className="bg-blue-200  font-bold rounded-xl px-2 py-1">
            Public: {publicRepo}
          </p>
          <p className="bg-red-200  font-bold rounded-xl px-2 py-1">
            Private: {privateRepo}
          </p>
        </div>
        <div className="mb-4">
          <input
            className="rounded-lg text-lg w-full hover:border-none hover:outline-none border-none outline-none font-medium shadow-md px-3 py-2 "
            type="search"
            placeholder="Search your Repositories"
            onChange={FilterRepo}
          />
        </div>
        {rederData &&
          rederData.map((repo) => (
            <div
              className="bg-white w-full md:flex md:flex-row flex-col md:items-center md:justify-between rounded-md border-b mb-2 shadow-sm drop-shadow-sm border-gray-100 px-5 py-3"
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
          ))}
      </div>
    </div>
  );
};

export default GithubRepos;
