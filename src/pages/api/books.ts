import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { subject, page } = req.query;
    const gbooksReqParams = new URLSearchParams();
    gbooksReqParams.set('q', `Subject:${subject}`);

    const result = await fetch(`https://www.googleapis.com/books/v1/volumes?${gbooksReqParams.toString()}`)
    const booksData = await result.json();
    res.status(200).send({
        data: booksData,
    })
    if (!req.query.subject) {
        res.status(400).send({
            error: true,
            message: 'No subject in query params'
        })
    }
}