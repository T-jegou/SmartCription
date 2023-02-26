import { connectionDB } from "./initialize_db";
import { v4 as uuidv4 } from 'uuid';


export async function userPrescription(prescriptionId: number, patientAdress: string) {
  const supabase = await connectionDB()
  const { error } = await supabase
    .from('userToken')
    .insert({ id: uuidv4(), prescriptionId: prescriptionId, address: patientAdress })
  if (error) {
    console.error(error);
  } else {
    console.log('Data inserted successfully!');
  }

}


export async function getUserPrescription(prescriptionId: number) {
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



export async function deleteUserPrescription(prescriptionId: number) {
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


export async function updateUserPrescription(prescriptionId: string, patientAddress: string) {
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