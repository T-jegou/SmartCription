import { connectionDB } from "./initialize_db";
import { v4 as uuidv4 } from 'uuid';


export async function Add_priscription_DB(prescription: string, patientAdress: string) {
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


export async function get_priscription(patientAdress: string) {
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



export async function delete_priscription(patientAdress: string) {
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


export async function update_priscription(prescription: string, patientAddress: string) {
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