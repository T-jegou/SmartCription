import { useState } from "react";


export default function PrescriptionForm() {
    const [address, setAddress] = useState('');
    const [medication, setMedication] = useState('');
    const [date, setDate] = useState('');
    const [instructions, setInstructions] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const prescription = { address, medication, date, instructions };
        alert('Prescription created');
        reset(e);
        // TODO create prescription
        // TODO notify user
        // TODO reset form
      }
      const reset=(e)=>{
        setAddress('');
        setMedication('');
        setDate('');
        setInstructions('');
      }
    return (
        <form onSubmit={handleSubmit}>
                <label>
                    Wallet address
                    <input type="text" 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)} />
                </label>
                <label>
                    Medication
                    <input type="text" value={medication} onChange={(e) => setMedication(e.target.value)}/>
                </label>
                <label>
                    Date
                    <input type="text" value={date} onChange={(e) => setDate(e.target.value)}/>
                </label>
                <label>
                    Instructions
                    <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)}/>
                </label>
                <div>
                    <button type="submit">Send</button>
                    <button type="reset"  onClick={(e) => reset(e)}>Cancel</button>
                </div>
            </form>
    )
}