const hre = require("hardhat");
async function getBalances(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.formatEther(balanceBigInt);
}

async function cosoleBalances(addresses) {
  let counter = 0;
  for (const address of addresses) {
    console.log(`Address ${counter} balance:`, await getBalances(address));
    counter++;
  }
}
async function consoleMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const name = memo.name;
    const from = memo.from;
    const message = memo.message;
    console.log(
      `At ${timestamp},name ${name},address ${from},message ${message}`
    );
  }
}
async function main() {
  const [owner, from1, from2, from3] = await hre.ethers.getSigners();
  const chai = await hre.ethers.getContractFactory("chai");
  const contract = await chai.deploy(); //instance of contract

  // await contract.deployed();  // not working
  await contract.waitForDeployment();
  console.log("Address of contract:", await contract.getAddress());

  const addresses = [
    owner.address,
    from1.address,
    from2.address,
    from3.address,
  ];
  console.log("Before buying Ration");
  await cosoleBalances(addresses);
  const amount = { value: hre.ethers.parseEther("5") };
  
  await contract.connect(from1).buyChai("from1", "washing powder", amount);
  await contract.connect(from2).buyChai("from2", "hair oil", amount);
  await contract.connect(from3).buyChai("from3", "Ghee", amount);

  console.log("After buying Ration");
  await cosoleBalances(addresses);

  const memos = await contract.getMemos();
  consoleMemos(memos);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});