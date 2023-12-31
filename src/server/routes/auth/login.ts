import * as express from "express";
import * as jwt from 'jsonwebtoken';
import * as passport from 'passport';
import { jwtCredentials } from '../../config';

const router = express.Router();

router.post('/', passport.authenticate('local', { session: false }), async (req, res) => {

    try {
        const token = jwt.sign(
            { userid: req.user?.userid, email: req.user?.email, role: 1 },
            jwtCredentials.secret!,
            { expiresIn: jwtCredentials.expires }
        );

        res.json(token);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Tried to log in, but something went wrong." })
    }
});

export default router;