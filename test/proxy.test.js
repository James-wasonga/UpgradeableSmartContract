const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Proxy Pattern", function () {
  it("Should delegate calls to LogicContract", async function () {
    const LogicContract = await ethers.getContractFactory("LogicContract");
    const logic = await LogicContract.deploy();
    await logic.waitForDeployment();

    const Proxy = await ethers.getContractFactory("Proxy");
    const proxy = await Proxy.deploy(logic.target);
    await proxy.waitForDeployment();

    const proxyAsLogic = await ethers.getContractAt("LogicContract", proxy.target);
    await proxyAsLogic.setValue(100);
    const value = await proxyAsLogic.value();
    expect(value).to.equal(100);
  });
});



