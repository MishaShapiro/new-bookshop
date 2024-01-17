import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req : NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).send({ error: true, message: 'Only POST' })
    }

    function validate(email = "", password = "") {
        if (!email.match("/^[^\s@]+@[^\s@]+\.[^\s@]+$/")) {
            return {
                    error: true
                }
        } else if (password.length >= 6) {
            return {
                error: true
            }
        } else {
            return {
                error: false
            }
        }
    }

    const { email, password } = req.body;
    // Ваша функция для валидации
    const validatedInfo = validate(email, password);

    if (validatedInfo.error) {
        res.status(400).send({ error: true, message: 'Email or password are incorrect' });
    } else {
        res.status(200).send({ success: true, token: 'testToken' });
    }
}