const { ethers } = require("ethers");

const CONTRACT_ADDRESS = "0x417E3aAED828759D48D568cF9ac6361cC03231A6";
const WALLET_PRIVATE_KEY = "0xcd789076ae01a3b3c30197b31fc1fc4bb55187aada94851c4151d6ad206ea944";
const MINT_FUNCTION = "mint";
const MINT_COUNT = 1;
const MINT_PRICE = "0";
const RPC_URL = "https://rpc.ankr.com/eth_sepolia";

const ABI = [
  `function ${MINT_FUNCTION}(uint256 _count) public payable`
];

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(WALLET_PRIVATE_KEY, provider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

  console.log("🚀 Minting NFT on Sepolia...");

  try {
    const tx = await contract[MINT_FUNCTION](MINT_COUNT, {
      value: ethers.utils.parseEther(MINT_PRICE).mul(MINT_COUNT),
      gasLimit: 150000,
      maxFeePerGas: ethers.utils.parseUnits("5", "gwei"),
      maxPriorityFeePerGas: ethers.utils.parseUnits("2", "gwei")
    });

    console.log("⏳ Tx hash:", tx.hash);
    const receipt = await tx.wait();
    console.log("✅ Mint success! Tx:", receipt.transactionHash);
  } catch (err) {
    console.error("❌ Mint failed:", err.message);
  }
}

main();
