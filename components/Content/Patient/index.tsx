import { Database } from '@lib/types/database.types';
import { useWeb3React } from '@web3-react/core';
import * as React from 'react';
import PrescriptionList from "./prescriptionList";

export type PrescriptionsResponse = {
    prescriptions: Database['public']['Tables']['userToken']['Row'][]
}

export default function Patient() {
    const { active, account } = useWeb3React()
    const [prescriptions, setPrescriptions] = React.useState<PrescriptionsResponse>({ prescriptions: [] })
    React.useEffect(() => {
        if (active && account) {
            fetch(`/api/prescriptions?patientAddress=${account}`)
                .then(res => res.json())
                .then((data: PrescriptionsResponse) => {
                    console.log(data)
                    setPrescriptions(data)
                })
        } else {
            alert('Please connect your wallet')
            return
        }
    }, [active])
    return (
        <div>
            <h1>Here are your prescriptions</h1> 
            <PrescriptionList prescriptions={prescriptions.prescriptions} /> 
        </div>  
    )
}

