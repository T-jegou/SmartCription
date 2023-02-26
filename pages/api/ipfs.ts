import type { NextApiRequest, NextApiResponse } from 'next'
import pinataSDK from '@pinata/sdk';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        // Get prescription data from request body
        const { patient, medication, date, instructions } = req.body
        const pinata = new pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET_KEY);
        const rep = await pinata.pinJSONToIPFS({
            patient,
            medication,
            date,
            instructions
        })
        res.status(200).json({ prescriptionIpfsHash: rep.IpfsHash })
    } else {
        res.status(400).json({ error: 'Only POST requests allowed' })
    }
}