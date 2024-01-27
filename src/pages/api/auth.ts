import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req : NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).send({ error: true, message: 'Only POST' })
    }

    function validate(email = "", password = "") {
        const EMAIL_REGEXP = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!EMAIL_REGEXP.test(email)) {
            return {
                error: true
            }
        } else if (password.length < 6) {
            return {
                error: true
            }
        } else {
            return {
                error: false
            }
        }
    }

    const { email, password } = JSON.parse(req.body);
    // Ваша функция для валидации
    const validatedInfo = validate(email, password);

    if (validatedInfo.error) {
        res.status(400).send({ error: true, message: 'Email or password are incorrect' });
    } else {
        res.status(200).send({ success: true, token: 'testToken' });
    }
}