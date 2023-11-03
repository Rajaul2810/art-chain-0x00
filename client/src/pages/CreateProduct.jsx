import React, { useEffect, useState } from "react";
import { uuid } from "uuidv4";


const CreateProduct = () => {

    const [product, setProduct] = useState({
        name:'',
        price:'',
        category:'',
    })
    const [imageURI, setImageURI] = useState(null);

    const handleChange = (e)=>{
        const newProduct = {...product};
        newProduct[e.target.name] = e.target.value;
        setProduct(newProduct);
    }
    const handleImageUpload = async (e) => {
        try {
          const file = e.target.files[0];
          if (!file) return;
    
          const ext = file.name.split(".").pop();
          const fileName = `${uuid()}.${ext}`;
          const newFile = new File([file], fileName, {
            type: file.type,
          });
    
          // Assuming you have a function named web3Storage.put for uploading
          const CID = await web3Storage.put([newFile], { name: fileName });
          const imageURI = `https://${CID}.ipfs.dweb.link/${fileName}`;
    
          // Set the uploaded image URI in the state
          setImageURI(imageURI);
          console.log("imageURI", imageURI);
        } catch (error) {
          console.log(error);
        }
      };

    const handleUpload = (e)=>{
        e.preventDefault()
    }
    console.log(product)
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Product Name</span>
                </label>
                <input
                  type="text"
                  placeholder="name"
                  className="input input-bordered"
                  required
                  name="name"
                  onChange={handleChange}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Price</span>
                </label>
                <input
                  type="text"
                  placeholder="Price"
                  name="price"
                  className="input input-bordered"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Select Category</span>
                </label>
                <select className="select select-bordered w-full max-w-xs" name="category" onChange={handleChange}>
                  <option disabled selected >Select</option>
                  <option >General</option>
                  <option>Exclusive</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo</span>
                </label>
                <input type="file" className="input input-bordered" accept="image/*" onChange={handleImageUpload} required />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary" onClick={handleUpload}>Upload</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
