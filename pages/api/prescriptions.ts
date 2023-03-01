import type { NextApiRequest, NextApiResponse } from 'next'
import pinataSDK from '@pinata/sdk';
import { addPrescription, getUserPrescriptions } from 'lib/backend';
import { Database } from '@lib/types/database.types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const {prescriptionId, patientAddress, prescriptionIpfsHash} = req.body
        await addPrescription(prescriptionId, patientAddress, prescriptionIpfsHash)
        return res.status(200).json({ message: 'Prescription added' })
    } else {
        if (req.method === 'GET') {
            const {patientAddress} = req.query
            // TODO: verify patient address is belonging to user who is making the request
            // like by asking for a signature from the user and verifying it
            if (typeof patientAddress !== 'string') {
                res.status(400).json({ error: 'patientAddress is required and must be a string' })
                return
            }
            const prescriptions = <Database['public']['Tables']['userToken']['Row'][] | null> await getUserPrescriptions(patientAddress)
            return res.status(200).json({ prescriptions })
        }
        res.status(400).json({ error: 'Only POST/GET requests allowed' })
    }
}