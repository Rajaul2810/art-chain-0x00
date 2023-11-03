import React from "react";
import { Link, useParams } from "react-router-dom";
import pic1 from "../assets/head.svg";
import pic2 from "../assets/header.jpg";
import pic3 from "../assets/react.svg";
import { FaEthereum, FaLayerGroup } from "react-icons/fa";
import { AiFillPlusCircle } from "react-icons/ai";

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

const CommunityDetails = () => {
  const { id } = useParams();
  console.log(id);
  const community = data.find((item) => item.id === Number(id));
  console.log(community);
  return (
    <div className="bg-indigo-100 pt-5 pb-10">
      <div className=" flex justify-center mt-10 mb-8 ">
        <h1 className=" bg-indigo-700 p-5 text-white font-bold text-2xl w-11/12 md:w-3/4 shadow-md">
          {community.title}
        </h1>
      </div>
      <Link to="/createProduct" className=" flex justify-end me-5 mb-2">
        <button className=" btn flex items-center bg-white p-3 rounded-full shadow-lg gap-2 ">
          <AiFillPlusCircle /> Add Product
        </button>
      </Link>
      <div className=" flex justify-center">
        <div className=" w-11/12 md:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {data.map((item, index) => (
            <div
              key={index}
              className=" p-5 shadow-md rounded-md bg-white hover:shadow-lg hover:transition-all hover:scale-105 duration-150"
            >
              <img
                src={item.photo}
                alt="img"
                className=" h-60 w-full rounded-md"
              />
              <p className=" font-bold pt-2 pb-1 text-center">{item.title}</p>
              {/* <p className="">{item.description}</p> */}
              <div className=" flex justify-between items-center p-3">
                <p className=" text-gray-700 text-sm font-bold flex justify-center items-center">
                  Price: 0.03 <FaEthereum />
                </p>
                <button className=" bg-indigo-600 text-white text-sm normal-case p-2 rounded-md shadow-md hover:scale-105 hover:bg-indigo-400 btn pt-0 pb-0 duration-150 transition-all">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityDetails;
