import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req : NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).send({ error: true, message: 'Only POST' })
    }

    const { email, password, allUsers } = JSON.parse(req.body);

    const sameUser = allUsers.filter((user: any) => {
        return (user.mail === email && user.pass === password)
    })

    if (sameUser.length === 0) {
        res.status(400).send({ error: true, message: "Email or password are incorrect" });
    } else {
        res.status(200).send({ success: true, token: 'testToken' });
    }
}