import { useState } from "react";
import { Database } from '@lib/types/database.types';
import PrescriptionList from "../Patient/prescriptionList";
import WalletAddressForm from "./walletAddressForm";
import { getContract } from "@utils/contract";
import { useWeb3React } from "@web3-react/core";
import { SubmitHandler, useForm } from "react-hook-form";
import { PrescriptionsResponse } from "../Patient";

type FormValues = {
    id: number
}

export default function Pharma() {
    const [walletPatient, setWalletPatient] = useState({ address: '', name: '', prescriptions: [] });
    const [redeemed, setRedeemed] = useState<boolean>(false);
    const { active, account } = useWeb3React()
    const { register, handleSubmit } = useForm<FormValues>();
    
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const id = process.env.PATIENT_ADDRESS
        // const { id } = data;
        // fetch(`/api/prescriptions?patientAddress=${id}`)
        //     .then(res => {
        //         return res.json()})
        //     .then((data: Database['public']['Tables']['userToken']['Row'][]) => {
        //         console.log(data);
                
        //         setPrescriptions(data)
        //         setWalletPatient({ address: data[0].address, name: '' })
        //     })
        const prescriptions = [
            {
                prescriptionId: 123,
                prescriptionHash: 'test123',
                redeemed: false
            },
            {
                prescriptionId: 1234,
                prescriptionHash: 'test1234',
                redeemed: true
            }
        ]
        setWalletPatient({ address: id, name: 'Random name', prescriptions })

        // if (active && account) {
        //     const contract = await getContract()
        //     const balance = await contract.balanceOf(account, id)
        //     balance.toNumber() > 0 ? setRedeemed(true) : setRedeemed(false)
        // } else {
        //     alert("Please connect your wallet")
        // }
    }

    const clearPatient = () => {
        setWalletPatient({ address: '', name: '', prescriptions: [] });
    }

    const switchRedeemed = () => {
        setRedeemed(!redeemed);
    }

    const template = () => {
        if (walletPatient.address !== '') {
            return (
                <div className="prescriptionlist-preview">
                    <div className="prescriptions-title">
                        <h1>{redeemed ? 'Redeemed' : 'Redeemable'} prescriptions for {walletPatient.name}</h1>
                        <div className="form switch-button">
                            <button onClick={switchRedeemed}>Switch to {redeemed ? 'redeemable' : 'redeemed'}</button>
                        </div>
                    </div>
                    <PrescriptionList prescriptions={walletPatient.prescriptions} onlyRedeemeds={redeemed} />
                    <div className="form">
                        <button onClick={clearPatient}>Back</button>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="form">
                    <h1>Patient wallet address</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" {...register("id")} />
                        <input type="submit" value="Submit"/>
                    </form>
                    {/* {
                        redeemed !== undefined && redeemed ? <div>✅ Redeemed</div> : <div>❌ Not redeemed</div>
                    } */}
                    {/* <WalletAddressForm showPrescriptions={showPrescriptions} /> */}
                </div>
            );
        }    
    }

    return (
        <div>
            { template() }
        </div>
    )
}