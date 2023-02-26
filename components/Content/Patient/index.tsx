import * as React from 'react';
import PrescriptionList from "./prescriptionList";

const prescriptions = [{id:1, description: "desc1"}, {id:2, description:"desc2"}];
export default function Patient() {
    return (
        <div className="prescriptionlist-preview" >
            <h1>Here are your subscriptions</h1> 
            <PrescriptionList prescriptions={prescriptions} /> 
        </div>  
    )
}

