import { ethers } from "ethers";
import { SmartCription, SmartCription__factory } from "typechain-types";

let contract: SmartCription | undefined = undefined

export const getContract = async () => {
    if (!contract)
        contract = SmartCription__factory.connect(process.env.NEXT_PUBLIC_CONTRACT!, new ethers.providers.JsonRpcProvider())
    return contract
}
