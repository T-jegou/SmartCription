import { Prescription } from 'interfaces/prescription.interface';
import * as React from 'react';

const PrescriptionList = ({ prescriptions }: any) => {
    return (
      <div className="prescriptionlist-preview" >
        {prescriptions.map((prescription: Prescription) => (
          <div className="prescription-preview" key={prescription.id}>
              <h2>{ prescription.description }</h2>
              <p>Id { prescription.id }</p>
              <button disabled={prescription.redeemed}>{prescription.redeemed ? 'Redeemed' : 'Redeem'}</button>
          </div>
        ))}
        <h1></h1>
      </div>
    );
}

export default PrescriptionList;
