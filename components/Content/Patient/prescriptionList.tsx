import * as React from 'react';
const PrescriptionList = ({ prescriptions }) => {
  return (
    <div>
      {prescriptions.map((prescription) => (
        <div className="prescription-preview" key={prescription.id}>
            <h2>{ prescription.description }</h2>
            <p>Id { prescription.id }</p>
            <button>Redeem</button>
        </div>
      ))}
      <h1></h1>
    </div>
  );
}

export default PrescriptionList;
