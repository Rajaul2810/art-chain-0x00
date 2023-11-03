import React from "react";
import create from '../assets/create.svg'

const CreateCom = () => {
  return (
    <div className="bg-indigo-100 pt-10 pb-10">
      <div className=" flex justify-center">
        <div className="md:w-3/4">
          <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
              <div className="text-center lg:text-left">
                <h1 className="text-3xl font-bold text-center pb-4 text-indigo-500">
                  Create Community
                </h1>
                <img src={create} alt="" />
              </div>
              <div className="card flex-shrink-0 w-full max-w-sm shadow-md bg-base-100">
                <form className="card-body">
                  <div className="form-control">
                    <label className="label ">
                      <span className="label-text">Title </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Title"
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Description</span>
                    </label>
                    <textarea
                     rows='8'
                      type="text"
                      placeholder="Enter description"
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control mt-6">
                    <button className="btn bg-indigo-700 text-white hover:bg-indigo-500">
                      Create
                    </button>
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

export default CreateCom;
