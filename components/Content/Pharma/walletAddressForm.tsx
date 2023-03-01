import { useState } from "react";


export default function WalletAddressForm(props: any) {
    const [address, setAddress] = useState('');
    
    const handleSubmit = () => {
        if (address === '') {
            alert("Address can not be empty");
        } else {
            props.showPrescriptions(address);
        }
        reset();
    }

    const reset = () => {
        setAddress('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Wallet address
                <input type="text" 
                value={address}
                onChange={(e) => setAddress(e.target.value)} />
            </label>
            <div>
                <button type="submit">Send</button>
                <button type="reset"  onClick={reset}>Cancel</button>
            </div>
        </form>
    )
}