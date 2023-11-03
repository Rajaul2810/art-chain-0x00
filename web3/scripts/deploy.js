require("ethers");

async function main() {
  const [deployer] = await ethers.getSigners();

  // console.log("*" * 10);
  // console.log("Deploying contracts with the account:", deployer.address);

  // const contractSUM = await ethers.deployContract("Sum");

  // await contractSUM.waitForDeployment();
  // console.log("*" * 10);
  // console.log("Contract address:", await contractSUM.getAddress());

  //add wait here

  const contract = await ethers.deployContract("ABXTOKEN");

  await contract.waitForDeployment();
  console.log("*" * 10);
  console.log("Contract address:", await contract.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
