import { connectionDB } from "./initialize_db";
import { v4 as uuidv4 } from 'uuid';


export async function addPrescription(prescription: string, patientAdress: string) {
  const supabase = await connectionDB()
  const { error } = await supabase
    .from('userToken')
    .insert({ id: uuidv4(), prescription: prescription, address: patientAdress })
  if (error) {
    console.error(error);
  } else {
    console.log('Data inserted successfully!');
  }

}


export async function getPrescription(patientAdress: string) {
  const supabase = await connectionDB()

  const { data, error } = await supabase
    .from('userToken')
    .select().eq('address', patientAdress)
  if (error) {
    console.error(error);
  } else {
    console.log('Data inserted successfully!');
  }
  return data;
}



export async function deletePrescription(patientAdress: string) {
  const supabase = await connectionDB()

  const { error } = await supabase
    .from('userToken')
    .delete()
    .eq('address', patientAdress)
  if (error) {
    console.error(error);
    return false;
  } else {
    console.log('Data deleted successfully!');
    return true;
  }

}


export async function updatePrescription(prescription: string, patientAddress: string) {
  const supabase = await connectionDB()

  const { error } = await supabase
    .from('userToken')
    .update({ prescription: prescription })
    .eq('Address', patientAddress)
  if (error) {
    console.error(error);
    return false;
  } else {
    console.log('Data updated successfully!');
    return true;
  }

}