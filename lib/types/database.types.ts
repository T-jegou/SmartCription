export interface Database {
    public: {
      Tables: {
        userToken: {
          Row: {id: 'uuid', prescriptionId: number, address: string, prescriptionHash: string} 
          Insert: {} 
          Update: {} 
        }
      }
    }
  }