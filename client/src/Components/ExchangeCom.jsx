import React from "react";
import pic from "../assets/ex.svg";
import { Link } from "react-router-dom";

const ExchangeCom = () => {
  return (
    <div className=" bg-indigo-50 pt-10 scroll-pb-10">
      <div className=" flex justify-center">
        <div className=" grid grid-cols-1 md:grid-cols-3 w-11/12 md:w-3/ p-10 gap-5 place-items-center">
          <div className="md:col-span-2">
            <img src={pic} alt="img" className=" h-96 w-full" />
          </div>
          <div>
            <h1 className=" text-3xl font-extrabold">What is ABX Token?</h1>
            <p className=" text-md text-justify pt-2 pb-4 ps-2">
              The ArtChain ecosystem is powered by the ABX token, a fundamental
              element ensuring seamless transactions and vibrant community
              interactions,ABX serves as the primary currency for all
              transactions within the ArtChain platform, including the creation
              of communities, staking for product approval, and purchasing art
              items in the marketplace.
            </p>
            <Link to="/exchange">
              <button className="btn bg-indigo-700 text-white hover:bg-indigo-500 w-full rounded-sm shadow-lg">
                Ethereum To ABX
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeCom;
