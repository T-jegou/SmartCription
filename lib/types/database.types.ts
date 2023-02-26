export interface Database {
    public: {
      Tables: {
        userToken: {
          Row: {id: 'uuid',prescriptionId:number, address: string} 
          Insert: {} 
          Update: {} 
        }
      }
    }
  }