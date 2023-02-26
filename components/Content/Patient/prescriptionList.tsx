import { PrescriptionDetails, IsReedemable } from '@components/Prescription';
import { Database } from '@lib/types/database.types';
import * as React from 'react';

const PrescriptionList = ({ prescriptions }: { prescriptions: Database['public']['Tables']['userToken']['Row'][]}) => {
    return (
        <div>
        {prescriptions.map((prescription) => (
            <div className="prescription-preview" key={prescription.prescriptionId}>
                <h2>Prescription #{ prescription.prescriptionId }</h2>
                <PrescriptionDetails hash={prescription.prescriptionHash}/>
                <IsReedemable id={prescription.prescriptionId}/>
            </div>
        ))}
        <h1></h1>
        </div>
    );
}

export default PrescriptionList;
