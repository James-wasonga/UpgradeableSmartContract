const { ethers } = require("hardhat");

async function main() {
  // Deploy LogicContract
  const LogicContract = await ethers.getContractFactory("LogicContract");
  const logic = await LogicContract.deploy();
  await logic.waitForDeployment();
  console.log("LogicContract deployed to:", await logic.getAddress());

  // Deploy Proxy with the address of LogicContract
  const Proxy = await ethers.getContractFactory("Proxy");
  const proxy = await Proxy.deploy(await logic.getAddress());
  await proxy.waitForDeployment();
  console.log("Proxy deployed to:", await proxy.getAddress());

  // Interact with the LogicContract via Proxy
  const proxyAsLogic = await ethers.getContractAt("LogicContract", await proxy.getAddress());
  await proxyAsLogic.setValue(42);
  const value = await proxyAsLogic.value();
  console.log("Value via proxy:", value.toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
