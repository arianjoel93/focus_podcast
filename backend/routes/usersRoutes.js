import express from "express"
import { authenticate, register, confirm, recoverPassword, newPassword, profile, checkToken } from "../controllers/usersControllers.js"
import checkAuth from "../middleware/checkAuth.js"
const router = express.Router()

router.post('/', register)
router.post('/login', authenticate)
router.get("/confirm/:token", confirm)
router.post('/recover-password', recoverPassword)
router.route("/recover-password/:token")
    .get(checkToken)
    .post(newPassword)
router.get('/profile', checkAuth, profile)


export default router