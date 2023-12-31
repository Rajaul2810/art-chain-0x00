import { useGlobalContext } from "./context";
import { useEffect, useState } from "react";
import getWeb3Storage from "./libs/web3.storage";
import { uuid } from "uuidv4";
import Navbar from "./Components/Navbar";
import Header from "./Components/Header";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Community from "./pages/Community";
import CommunityDetails from "./pages/CommunityDetails";
import Exchange from "./pages/Exchange";
import CreateCom from "./pages/CreateCom";
import Footer from "./Components/footer";
import CreateProduct from "./pages/CreateProduct";
import ProductList from "./pages/ProductList";

function App() {
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

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageURI, setImageURI] = useState(null);

  const web3Storage = getWeb3Storage();

  console.log("ABXState from app.jsx", ABXState);

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

  const buyToken = async () => {
    const tx = await ABXcontract.buyABX();
  };

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/community" element={<Community />} />
        <Route path="/exchange" element={<Exchange />} />
        <Route path="/create" element={<CreateCom />} />
        <Route path="/createProduct" element={<CreateProduct />} />
        <Route path="/productList" element={<ProductList />} />
        <Route path="/community/:id" element={<CommunityDetails />} />
      </Routes>
      <Footer />
      {/* <h1>{address}</h1>
      <h1>{isConnected ? "Connected" : "Not Connected"}</h1>
      <h1>{isDisconnected ? "Disconnected" : "Not Disconnected"}</h1>
      <button onClick={sumAns}>Sum</button>
      <button onClick={divAns}>Div</button> */}

      {/* Add the image upload section */}
      {/* <input type="file" accept="image/*" onChange={handleImageUpload} />
      {imageURI && <img src={imageURI} alt="Uploaded" />}
      {imageURI && <h1>{imageURI}</h1>} */}
    </div>
  );
}

export default App;
