import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAccount, useWalletClient, usePublicClient } from "wagmi";
import { getContract, getWalletClient } from "@wagmi/core";
import { abiABX } from "../contracts";
import { ethers, BrowserProvider } from "ethers";
import { useWaitForTransaction } from "wagmi";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const { address, isConnected, isDisconnected } = useAccount();

  const [ABXState, setABXState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  // const [divState, setdivState] = useState({
  //   provider: null,
  //   signer: null,
  //   contract: null,
  // });

  const [errorMessage, seterrorMessage] = useState("");
  const [tx, setTx] = useState("");
  const { isLoading, isSuccess, error } = useWaitForTransaction({
    hash: tx.hash,
  });

  const contractInstance = async () => {
    const contractABX = import.meta.env.VITE_CONTRACT_ADDRESS_ABXTOKEN;
    const contractAbiABX = abiABX;
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const contractABXTOKEN = new ethers.Contract(
          contractABX,
          contractAbiABX,
          signer
        );
        setABXState({
          provider: provider,
          signer: signer,
          contract: contractABXTOKEN,
        });
        console.log("contractABXTOKEN", contractABXTOKEN);

        // const contractDIV = new ethers.Contract(
        //   contractAddressDIV,
        //   contractABIDIV,
        //   signer
        // );
        // setdivState({
        //   provider: provider,
        //   signer: signer,
        //   contract: contractDIV,
        // });
        // console.log("ContractDIV", contractDIV);
      } else {
        alert("Please install metamask");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isConnected) {
      contractInstance();
      console.log("Connected");
    }
  }, [isConnected]);

  // useEffect(() => {
  //   if (errorMessage) {
  //     const parsedErrorMessage = errorMessage?.reason
  //       ?.slice("execution reverted: ".length)
  //       .slice(0, -1);
  //     if (parsedErrorMessage) {
  //       console.log(parsedErrorMessage);
  //       alert(parsedErrorMessage);
  //       // setShowAlert({
  //       //   status: true,
  //       //   type: "failure",
  //       //   message: parsedErrorMessage,
  //       // });
  //     }
  //   }
  // }, [errorMessage]);

  // useEffect(() => {
  //   console.log("tx", tx);
  //   console.log("isLoading", isLoading);
  //   console.log("isSuccess", isSuccess);
  //   console.log("error", error);
  // }, [tx, isLoading, isSuccess, error]);

  return (
    <GlobalContext.Provider
      value={{
        address,
        isConnected,
        isDisconnected,
        ABXState,
        tx,
        setTx,
        error,
        isLoading,
        isSuccess,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export const useGlobalContext = () => useContext(GlobalContext);
