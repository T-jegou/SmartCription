import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'


export async function connectionDB() {
  const supabaseUrl = process.env.SUPERBASE_URL;
  const supabaseKey = process.env.SUPERBASE_KEY;
   if (!supabaseUrl || !supabaseKey)
    {
      throw new Error;
    }


  const supabase = createClient<Database>(
    supabaseUrl,
    supabaseKey
  )
  
  return supabase;
}


