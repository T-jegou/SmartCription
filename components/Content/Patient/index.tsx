import * as React from 'react';
import PrescriptionList from "./prescriptionList";

const prescriptions = [{ id:1, description: "desc1", reedemed: false }, { id:2, description: "desc2", reedemed: true }];
export default function Patient() {
    return (
        <div>
            <h1>Here are your subscriptions</h1> 
            <PrescriptionList prescriptions={prescriptions} /> 
        </div>  
    )
}

