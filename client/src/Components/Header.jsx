import React from "react";
import header from "../assets/head.svg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className=" flex justify-center">
      <div className=" grid grid-cols-1 md:grid-cols-2 w-11/12 md:w-3/ p-10 gap-5 place-items-center">
        <div>
          <h1 className=" text-5xl font-extrabold">
            Welcome to <br />
            <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-indigo-600 relative inline-block m-2 shadow-md">
              <span className="relative text-white font-serif">ArtChain</span>
            </span>
            <br /> Marketplace
          </h1>
          <p className=" text-md text-justify pt-2 pb-4">
            ArtChain is a revolutionary platform that empowers creators to
            establish decentralized communities centered around specific art
            genres, such as portrait, photography, and painting. Operating as a
            Decentralized Autonomous Organization (DAO), ArtChain ensures a
            community-driven approach, free from centralized control.
          </p>
          <Link to="/create">
              <button className="btn bg-indigo-700 text-white hover:bg-indigo-500 w-full rounded-sm shadow-lg">
                Create Community
              </button>
            </Link>
        </div>
        <div className="">
          <img src={header} alt="img" className=" h-96 w-full" />
        </div>
      </div>
    </div>
  );
};

export default Header;
