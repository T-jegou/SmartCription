import { Database } from '@lib/types/database.types';
import { Prescription } from '@lib/types/prescription';
import * as React from 'react';

const PrescriptionDetails = ({hash}: {hash: string}) => {
    const [prescription, setPrescription] = React.useState<Prescription>()
    React.useEffect(() => {
        fetch(`https://ipfs.io/ipfs/${hash}`)
            .then(res => res.json())
            .then((data: Prescription) => {
                setPrescription(data)
            })
    }, [hash])
    if (prescription) {
        return (
            <div>
                <h2>{ prescription.medication }</h2>
                <p>{ prescription.date }</p>
                <p>{ prescription.instructions }</p>
            </div>
        )
    } else {
        return null
    }
}

const PrescriptionList = ({ prescriptions }: { prescriptions: Database['public']['Tables']['userToken']['Row'][]}) => {
    return (
        <div>
        {prescriptions.map((prescription) => (
            <div className="prescription-preview" key={prescription.prescriptionId}>
                <h2>Prescription #{ prescription.prescriptionId }</h2>
                <PrescriptionDetails hash={prescription.prescriptionHash}/>
                <button>Redeem</button>
            </div>
        ))}
        <h1></h1>
        </div>
    );
}



export default PrescriptionList;
