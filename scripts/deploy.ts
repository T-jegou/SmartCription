import { ethers } from "hardhat";

async function main() {
    if (!process.env.MEDIC_ADDRESS) throw new Error("MEDIC_ADDRESS not set")
    if (!process.env.PHARMA_ADDRESS) throw new Error("PHARMA_ADDRESS not set")

    const medic = process.env.MEDIC_ADDRESS
    const pharma = process.env.PHARMA_ADDRESS
    console.log(`Medic address: ${medic}`)
    console.log(`Pharma address: ${pharma}`)

    const SmartCription = await ethers.getContractFactory("SmartCription")
    let smartCription = await SmartCription.deploy()
    const contract = await smartCription.deployed()
    console.log(`SmartCription deployed to: ${contract.address}`)
    await smartCription.grantRole(await smartCription.MEDIC_ROLE(), medic)
    await smartCription.grantRole(await smartCription.PHARMACIST_ROLE(), pharma)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
