import { connectionDB } from "./initialize_db";
import { v4 as uuidv4 } from 'uuid';


export async function addPrescription(prescriptionId: number, patientAdress: string, prescriptionHash: string) {
    const supabase = await connectionDB()
    const { error } = await supabase
        .from('userToken')
        .insert({ id: uuidv4(), prescriptionId: prescriptionId, address: patientAdress, prescriptionHash })
    if (error) {
        console.error(error);
    } else {
        console.log(`Prescription ${prescriptionId} added successfully!`);
    }
}


export async function getPrescription(prescriptionId: number) {
    const supabase = await connectionDB()

    const { data, error } = await supabase
        .from('userToken')
        .select().eq('prescriptionId', prescriptionId)
    if (error) {
        console.error(error);
    } else {
        console.log('Data inserted successfully!');
    }
    return data;
}

export async function getUserPrescriptions(patientAddress: string) {
    const supabase = await connectionDB()

    const { data, error } = await supabase
        .from('userToken')
        .select().eq('address', patientAddress)
    if (error) {
        console.error(error);
    } else {
        console.log('Data inserted successfully!');
    }
    return data;
}

export async function deletePrescription(prescriptionId: number) {
    const supabase = await connectionDB()

    const { error } = await supabase
        .from('userToken')
        .delete()
        .eq('prescriptionId', prescriptionId)
    if (error) {
        console.error(error);
        return false;
    } else {
        console.log('Data deleted successfully!');
        return true;
    }

}


export async function updatePrescription(prescriptionId: string, patientAddress: string) {
    const supabase = await connectionDB()

    const { error } = await supabase
        .from('userToken')
        .update({ prescriptionId: prescriptionId })
        .eq('Address', patientAddress)
    if (error) {
        console.error(error);
        return false;
    } else {
        console.log('Data updated successfully!');
        return true;
    }

}