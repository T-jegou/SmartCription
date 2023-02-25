import { useState } from "react";
import PrescriptionForm from "./prescriptionForm";

export default function Medic() {
    return (
        <div>
            <h1>Write a prescription</h1>
            <PrescriptionForm />
        </div>
    )
}