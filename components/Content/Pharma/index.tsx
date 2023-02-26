import { getContract } from "@utils/contract";
import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
    id: number
}

export default function Pharma() {
    const { register, handleSubmit } = useForm<FormValues>();
    const { active, account } = useWeb3React()
    const [reedemed, setRedeemed] = useState<boolean>()
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const { id } = data;
        if (active && account) {
            const contract = await getContract()
            const balance = await contract.balanceOf(account, id)
            balance.toNumber() > 0 ? setRedeemed(true) : setRedeemed(false)
        } else {
            alert("Please connect your wallet")
        }
    }
    return (
        <div>
            <h1>Pharma</h1>
            <h2>Check if a prescription is redeemed</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="number" {...register("id")} />
                <input type="submit" value="Submit"/>
            </form>
            {
                reedemed !== undefined && reedemed ? <div>✅ Redeemed</div> : <div>❌ Not redeemed</div>
            }
        </div>
    )
}