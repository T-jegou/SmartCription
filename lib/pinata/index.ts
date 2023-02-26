import pinataSDK from '@pinata/sdk';

export class Pinata {
    pinata: pinataSDK;
    
    constructor() {
        this.pinata = new pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET_KEY);
    }

    async pinJSONToIPFS(patient: string, medication: string, date: string, instructions: string) {
        const rep = await this.pinata.pinJSONToIPFS({
            patient,
            medication,
            date,
            instructions
        })
        return rep.IpfsHash
    }
}