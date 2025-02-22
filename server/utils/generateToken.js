import jwt from 'jsonwebtoken';

export const generateToken = (res, user, message) => {
    const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production', // Secure cookie only in production
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    return res.status(200).json({ success: true, message, user, token });
};
