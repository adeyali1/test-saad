import { NextApiRequest, NextApiResponse } from "next";
import fs from 'fs'
import path from 'path'

async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            return _get(req, res);
    }
}

async function _get(req: NextApiRequest, res: NextApiResponse) {
    try {


        const filePath = path.resolve('.', 'public/pdf/EBOS-Introduction.pdf')
        console.log(filePath)
        const pdfBuffer = fs.readFileSync(filePath)


        res.setHeader('Content-Type', 'application/pdf')
        res.send(pdfBuffer)


    } catch (error: any) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export default handler;
