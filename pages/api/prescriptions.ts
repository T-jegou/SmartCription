import type { NextApiRequest, NextApiResponse } from 'next'
import pinataSDK from '@pinata/sdk';
import { getUserPrescriptions } from 'lib/backend';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const {prescriptionId, patientAddress, prescriptionIpfsHash} = req.body
        // TODO: Add prescription to Supabase
    } else {
        if (req.method === 'GET') {
            const {patientAddress} = req.query
            // TODO: verify patient address is belonging to user who is making the request
            // like by asking for a signature from the user and verifying it
            if (typeof patientAddress !== 'string') {
                res.status(400).json({ error: 'patientAddress must be a string' })
                return
            }
            const prescriptions = await getUserPrescriptions(patientAddress)
            return res.status(200).json({ prescriptions })
        }
        res.status(400).json({ error: 'Only POST/GET requests allowed' })
    }
}