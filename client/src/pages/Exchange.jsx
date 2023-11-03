import React from "react";
import exchange from '../assets/exchange.svg';

const Exchange = () => {
  return (
    <div className="bg-indigo-100 pt-10 pb-10">
      <div className=" flex justify-center">
        <div className="md:w-3/4">
          <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
              <div className="text-center lg:text-left">
                <h1 className="text-3xl font-bold text-center pb-4 text-indigo-500">Exchange <span className=" text-red-700 animate-pulse">Now!</span></h1>
                <img  src={exchange} alt=""/>
              </div>
              <div className="card flex-shrink-0 w-full max-w-sm shadow-md bg-base-100">
                <form className="card-body">
                  <div className="form-control">
                    <label className="label ">
                      <span className="label-text">Exchange Rate </span>
                    </label>
                    <input
                      type="text"
                      placeholder="1 eth = 1 abx token"
                      className="input input-bordered"
                      disabled
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">ABX(Token)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter ABX token"
                      className="input input-bordered"
                      required
                    />
                    
                  </div>
                  <div className="form-control mt-6">
                    <button className="btn bg-indigo-700 text-white hover:bg-indigo-500">Exchange</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exchange;
