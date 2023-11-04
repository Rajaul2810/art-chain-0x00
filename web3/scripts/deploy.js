require("ethers");

async function main() {
  const [deployer] = await ethers.getSigners();

  // const contract = await ethers.deployContract("ABXTOKEN");

  // await contract.waitForDeployment();
  // console.log("*" * 10);
  // console.log("Contract address:", await contract.getAddress());

  const contract = await ethers.deployContract("CommunityContract", [
    "0x6D8aaBD5544cC7B2249c2e6351CFb0d3006d515b",
    "0x5513ab3e537496ad9f2F910FBed865735DA26966",
  ]);

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
