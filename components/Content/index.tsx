import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { getContract } from "@utils/contract";
import MedicContent from "./Medic";
import PharmacistContent from "./Pharma";
import PatientContent from "./Patient";
import SelectWalletModal from "@components/wallet/ModalConnect"
import Icon from '@mdi/react';
import { mdiHeartPulse } from '@mdi/js';

function Welcome () {
    return (
        <div className="login-page">
            <div className="login-text-title">
                <Icon path={mdiHeartPulse} size={8} />
                <h1>SmartCription</h1>
                <p>Find your prescription all in one digitalized place</p>
                <p>Connect your wallet to start</p>
            </div>
            <div className="login-connect-wallet">
                <h3>Log in</h3>
                <SelectWalletModal />
            </div>
        </div>
    )
}

function Medic () {
    return (
        <>
            <MedicContent />
        </>
    )
}

function Pharmacist () {
    return (
        <>
            <PharmacistContent />
        </>
    )
}

function Patient () {
    return (
        <>
            <PatientContent />
        </>
    )
}

export default function Content() {
    const { active, account } = useWeb3React()
    const [type, setType] = useState<"medic"|"pharma"|"patient"|undefined>(undefined)
    useEffect(() => {
        if (active && account) {
            getContract().then(async (contract) => {
                console.log(contract)
                const r = await Promise.all([
                    contract.functions.hasRole(contract.MEDIC_ROLE(), account),
                    contract.functions.hasRole(contract.PHARMACIST_ROLE(), account)
                ])
                if (r[0][0]) {
                    setType("medic")
                } else if (r[1][0]) {
                    setType("pharma")
                } else {
                    setType("patient")
                }
            })
        }
    }, [account])
    switch (type) {
        case "medic":
            return <Medic />
            break;
        case "pharma":
            return <Pharmacist />
            break;
        case "patient":
            return <Patient />
            break;
        case undefined:
            return <Welcome />
            break;
        default:
            return <Welcome />
            break;
    }
}