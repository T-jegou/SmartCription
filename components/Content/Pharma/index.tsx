import { Prescription } from "interfaces/prescription.interface";
import { useState } from "react";
import PrescriptionList from "../Patient/prescriptionList";
import WalletAddressForm from "./walletAddressForm";

export default function Pharma() {
    const [walletPatient, setWalletPatient] = useState({ address: '', name: '', prescriptions: [{id: 0, description: '', redeemed: false}] });
    const [redeemed, setRedeemed] = useState(false);

    const showPrescriptions = (address: string) => {
        console.log("showPrescriptions");
        
        // Get prescriptions from address
        const prescriptions = [
            { id:1, description: "desc1", redeemed: false },
            { id:2, description: "desc2", redeemed: true }
        ];
        setWalletPatient({ address, name: 'Dave Loper', prescriptions });
    }

    const clearPatient = () => {
        setWalletPatient({ address: '', name: '', prescriptions: [{id: 0, description: '', redeemed: false}] });
    }

    const switchRedeemed = () => {
        setRedeemed(!redeemed);
    }

    const getPrescriptions = () => {
        const prescriptionsByRedeem: Prescription[] = [];
        walletPatient.prescriptions.forEach((prescription) => {
            if ((redeemed && prescription.redeemed) || (!redeemed && !prescription.redeemed)) {
                prescriptionsByRedeem.push(prescription);
            }
        })
        return prescriptionsByRedeem;
    }

    const template = () => {
        console.log("template");
        
        if (walletPatient.address !== '') {
            return (
                <div className="prescriptionlist-preview">
                    <div className="prescriptions-title">
                        <h2>{redeemed ? 'Redeemed' : 'Redeemable'} prescriptions for {walletPatient.name}</h2>
                        <div className="form switch-button">
                            <button onClick={switchRedeemed}>Switch to {redeemed ? 'redeemable' : 'redeemed'}</button>
                        </div>
                    </div>
                    <PrescriptionList prescriptions={getPrescriptions()} />
                    <div className="form">
                        <button onClick={clearPatient}>Back</button>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="form">
                    <WalletAddressForm showPrescriptions={showPrescriptions} />
                </div>
            );
        }    
    }

    return (
        <div>
            <h1>Pharma</h1>
            { template() }
        </div>
    )
}