import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
    address: string;
    medication: string;
    date: string;
    instructions: string;
}

export default function PrescriptionForm() {
    const { register, handleSubmit, reset } = useForm<FormValues>();
    const onSubmit: SubmitHandler<FormValues> = data => {
        const { address, medication, date, instructions } = data;
        alert('Prescription created');
        reset();
        // TODO create prescription
        // TODO notify user
        // TODO reset form
    }
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                Wallet address
                <input type="text" {...register("address")} />
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