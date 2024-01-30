import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req : NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).send({ error: true, message: 'Only POST' })
    }

    function validate(email = "", password = "") {
        const EMAIL_REGEXP = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!EMAIL_REGEXP.test(email)) {
            return {
                error: true,
                message: 'Email are incorrect',
            }
        } else if (password.length < 6) {
            return {
                error: true,
                message: 'Your password must be at least 6 characters long',
            }
        } else {
            return {
                error: false
            }
        }
    }

    const { oldMail, email, password, repeatPass, name, info, allUsers } = JSON.parse(req.body);
    // Ваша функция для валидации
    const validatedInfo = validate(email, password);
    
    allUsers.map((user: any) => {
        if (oldMail === user.mail) {
            user.mail = email
            user.pass = password
            user.name = name
            user.info = info
        }
        return user
    })
    if (validatedInfo.error) {
        res.status(400).send({ error: true, message: validatedInfo.message });
    } else if (password !== repeatPass) {
        res.status(400).send({ error: true, message: 'Password and Repeat password not the same' })
    } else {
        res.status(200).send({ success: true, allUsers: allUsers });
    }
}