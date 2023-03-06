import { addPrescription, deletePrescription } from "../lib/backend";
import { Pinata } from "../lib/pinata";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";

async function main() {
    if (!process.env.MEDIC_ADDRESS) throw new Error("MEDIC_ADDRESS not set")
    if (!process.env.PHARMA_ADDRESS) throw new Error("PHARMA_ADDRESS not set")
    if (!process.env.DEMO_PATIENT_ADDRESS) throw new Error("DEMO_PATIENT_ADDRESS not set")
    const [owner] = await ethers.getSigners()
    console.log(`Deploying contracts with the account: ${owner.address}`)

    const medic = process.env.MEDIC_ADDRESS
    const pharma = process.env.PHARMA_ADDRESS
    const patient = process.env.DEMO_PATIENT_ADDRESS
    console.log(`Medic address: ${medic}`)
    console.log(`Pharma address: ${pharma}`)
    console.log(`Patient address: ${patient}`)

    const SmartCription = await ethers.getContractFactory("SmartCription")
    let smartCription = await SmartCription.deploy()
    const contract = await smartCription.deployed()
    console.log(`SmartCription deployed to: ${contract.address}`)
    await smartCription.grantRole(await smartCription.MEDIC_ROLE(), owner.address)
    await smartCription.grantRole(await smartCription.MEDIC_ROLE(), medic)
    await smartCription.grantRole(await smartCription.PHARMACIST_ROLE(), pharma)

    const tx = await smartCription.mint(patient, 2, "0x00")
    const id: BigNumber = (await tx.wait()).events?.find(event => event.event === 'PrescriptionMinted')?.args?.id
    console.log(`Prescription minted with id: ${id}`)

    const medication = "Paracetamol"
    const date = "2021-01-01"
    const instructions = "Take 2 pills every 4 hours"
    const pinata = new Pinata()
    const hash = await pinata.pinJSONToIPFS({prescriptionId: id.toString(), patient, medication, date, instructions})
    console.log(`JSON pinned to IPFS with hash: ${hash}`)

    const res = await deletePrescription(id.toNumber())
    console.log(`Prescription ${id} cleaned from Supabase: ${res}`)
    await addPrescription(id.toNumber(), patient, hash)
    await owner.sendTransaction({to: patient, value: ethers.utils.parseEther("1")})
    console.log(`1 ETH transferred to patient ${patient}`)
    await owner.sendTransaction({to: pharma, value: ethers.utils.parseEther("1")})
    console.log(`1 ETH transferred to pharma ${pharma}`)
    await owner.sendTransaction({to: medic, value: ethers.utils.parseEther("1")})
    console.log(`1 ETH transferred to medic ${medic}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
