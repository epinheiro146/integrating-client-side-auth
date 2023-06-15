import * as express from "express";
import usersRouter from "./users";
import chirpsRouter from "./chirps";

const router = express.Router();

router.use("/health", (req, res) => {
    const timestamp = new Date().toLocaleString();
    res.status(200).json({ message: "Nice. Server is working.", timestamp });
});

router.use("/users", usersRouter);
router.use("/chirps", chirpsRouter);

export default router;