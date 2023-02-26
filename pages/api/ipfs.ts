import type { NextApiRequest, NextApiResponse } from 'next'
import {Pinata} from '@lib/pinata'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        // Get prescription data from request body
        const { prescriptionId, patient, medication, date, instructions } = req.body
        const pinata = new Pinata()
        const hash = await pinata.pinJSONToIPFS(prescriptionId, patient, medication, date, instructions)
        res.status(200).json({ prescriptionIpfsHash: hash })
    } else {
        res.status(400).json({ error: 'Only POST requests allowed' })
    }
}