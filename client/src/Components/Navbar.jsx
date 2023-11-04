import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";
import { FaWallet } from "react-icons/fa";
import { useGlobalContext } from "../context";
import { useEffect } from "react";
import { ethers } from "ethers";
const Navbar = () => {
  const {
    address,
    isConnected,
    isDisconnected,
    ABXState,
    tx,
    setTx,
    error,
    isLoading,
    isSuccess,
  } = useGlobalContext();

  const ABXcontract = ABXState.contract;
  const [token, setToken] = useState(0);

  const ABXtokenFunc = async () => {
    const token = await ABXcontract.balanceOf(address);
    setToken(Number(token) / 10 ** 12);
    console.log(Number(token) / 10 ** 12);
  };
  console.log(token);

  const getAbx = () => {
    ABXtokenFunc();
  };

  // useEffect(() => {
  //   ABXtokenFunc();
  // }, [ABXcontract]);

  return (
    <div className="navbar bg-base-100 shadow-md mb-2">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/community">Community</Link>
            </li>
            <li>
              <Link to="/exchange">Exchange</Link>
            </li>
            <li>
              <Link to="/create">Create Community</Link>
            </li>

            <div className="flex-none">
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle bg-black"
                >
                  <div className="indicator" onClick={getAbx}>
                    <FaWallet size={25} color=" white" />
                    <span className="badge badge-sm indicator-item bg-red-700 animate-pulse text-white">
                      wallet
                    </span>
                  </div>
                </label>
                <div
                  tabIndex={0}
                  className="mt-3 z-[1] card card-compact dropdown dropdown-end w-72 bg-base-100 shadow"
                >
                  <div className="card-body">
                    <span className="font-bold text-md">
                      ABX Token: {token}
                    </span>
                    <Link to="/productList">Product List</Link>
                  </div>
                </div>
              </div>
            </div>
          </ul>
        </div>
        <Link
          to="/"
          className="btn text-3xl btn-ghost normal-case text-indigo-800 font-bold"
        >
          ArtChain
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/community">Community</Link>
          </li>
          <li>
            <Link to="/exchange">Exchange</Link>
          </li>
          <li>
            <Link to="/create">Create Community</Link>
          </li>
        </ul>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle bg-black">
              <div className="indicator" onClick={getAbx}>
                <FaWallet size={25} color=" white" />
                <span className="badge badge-sm indicator-item bg-red-700 animate-pulse text-white">
                  wallet
                </span>
              </div>
            </label>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-72 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-md">ABX Token: {token}</span>
                <Link to="/productList">Product List</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="navbar-end">
        <ConnectButton />
      </div>
    </div>
  );
};

export default Navbar;
