import { connectionDB } from "./initialize_db";
import { v4 as uuidv4 } from 'uuid';


export async function Add_priscription_DB(prescription: string,patientAdress: string ) {
const supabase=await connectionDB()
const { error } = await supabase
    .from('userToken')
    .insert({ id: uuidv4(),prescription:prescription , address: patientAdress})
  if (error) {
    console.error(error);
  } else {
    console.log('Data inserted successfully!');
  }

}