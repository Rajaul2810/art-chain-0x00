import React, { useState } from "react";
import pic1 from "../assets/head.svg";
import pic2 from "../assets/header.jpg";
import pic3 from "../assets/react.svg";
import { FaEthereum, FaLayerGroup } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";
import { useEffect } from "react";

const data = [
  {
    id: 1,
    photo: pic2,
    title: "Digital Art Community",
    description:
      "Lorem ipsum is a placeholder text commonly used to demonstrate",
  },
  {
    id: 2,
    photo: pic1,
    title: "HandCraft Art Community",
    description:
      "Lorem ipsum is a placeholder text commonly used to demonstrate",
  },
  {
    id: 3,
    photo: pic3,
    title: "Game Art Community",
    description:
      "Lorem ipsum is a placeholder text commonly used to demonstrate",
  },
];

const Community = () => {
  const {
    address,
    isConnected,
    isDisconnected,
    ABXState,
    ComState,
    tx,
    setTx,
    error,
    isLoading,
    isSuccess,
  } = useGlobalContext();

  const Comcontract = ComState.contract;
  const [communitys, setCommunitys] = useState([]);

  // useEffect(() => {
  //   getAllCommunitiesOfUser();
  // }, []);

  const getCom = () => {
    getAllCommunitiesOfUser();
  };
  const getAllCommunitiesOfUser = async () => {
    const communities = await Comcontract.communityList();

    setCommunitys(communities);
  };
  console.log(communitys);

  return (
    <div className=" bg-indigo-100 pt-10 pb-10 min-h-screen">
      <div>
        <div
          className=" flex justify-center mb-8 cursor-pointer"
          onClick={getCom}
        >
          <h1 className=" bg-indigo-700 p-5 text-white font-bold text-2xl w-11/12 md:w-3/4 shadow-md">
            All Communities
          </h1>
        </div>
        <div className=" flex justify-center">
          <div className=" w-11/12 md:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-5">
            {data.map((item, index) => (
              <Link
                to={`/community/${item.id}`}
                key={index}
                className=" p-5 shadow-md rounded-md bg-white hover:shadow-lg hover:transition-all hover:scale-105 duration-150 flex justify-between items-center gap-5 "
              >
                <div className=" bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-full shadow-md p-3">
                  <FaLayerGroup size={30} color=" white" className="" />
                </div>
                <div>
                  <p className=" font-bold">{item.title}</p>
                  <p className=" text-sm text-gray-600">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
