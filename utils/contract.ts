import { Contract, ethers } from "ethers";
import { SmartCription, SmartCription__factory } from "typechain-types";
import { Web3Provider } from "@ethersproject/providers"

let contract: SmartCription | undefined = undefined

export const getContract = async (signer?: ethers.Signer) => {
    if (signer) {
        return new Contract(process.env.NEXT_PUBLIC_CONTRACT!, SmartCription__factory.abi, signer)
    }
    if (!contract)
        contract = SmartCription__factory.connect(process.env.NEXT_PUBLIC_CONTRACT!, new ethers.providers.JsonRpcProvider())
    return contract
}
