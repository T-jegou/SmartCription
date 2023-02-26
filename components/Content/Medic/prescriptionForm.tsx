import { getContract } from "@utils/contract";
import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "ethers";
import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
    patientAddress: string;
    medication: string;
    date: string;
    instructions: string;
}

export default function PrescriptionForm() {
    const { register, handleSubmit, reset } = useForm<FormValues>();
    const { active, account } = useWeb3React()
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const { patientAddress, medication, date, instructions } = data;
        if (active && account) {
            const contract = await getContract()
            const tx = await contract.mint(patientAddress, 2, "0x00")
            const prescriptionId: BigNumber = (await tx.wait()).events?.find(event => event.event === 'PrescriptionMinted')?.args?.id
            // TODO: call Backend API to store prescription id and patient address in database
            // TODO: call Backend API to create IPFS file with prescription data abd image and store hashes in database
        } else {
            alert('Please connect your wallet')
            return
        }
        alert('Prescription created');
        reset();
        // TODO create prescription
        // TODO notify user
        // TODO reset form
    }
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                Wallet patient address
                <input type="text" {...register("patientAddress")} />
            </label>
            <label>
                Medication
                <input type="text" {...register("medication")} />
            </label>
            <label>
                Date
                <input type="text" {...register("date")}/>
            </label>
            <label>
                Instructions
                <textarea {...register("instructions")}/>
            </label>
            <div>
                <button type="submit">Send</button>
                <button type="reset" onClick={(e) => reset()}>Cancel</button>
            </div>
        </form>
    )
}