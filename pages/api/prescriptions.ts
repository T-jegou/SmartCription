import type { NextApiRequest, NextApiResponse } from 'next'
import pinataSDK from '@pinata/sdk';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const {prescriptionId, patientAddress, prescriptionIpfsHash} = req.body
        // TODO: Add prescription to Supabase
    } else {
        res.status(400).json({ error: 'Only POST requests allowed' })
    }
}