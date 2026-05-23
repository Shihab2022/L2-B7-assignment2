import express from "express";
import { AuthController } from "./auth.controller";
// import auth from '../../middlewares/auth';
const router = express.Router();

router.post("/signup", AuthController.signUpUser);
router.post("/login", AuthController.loginUser);
// router.post("/refresh-token", AuthController.genRefreshToken);
// router.post("/forgot-password", AuthController.forgotPassword);
// router.post('/change-password', auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT), AuthController.changePassword)
// router.post(
//     '/reset-password',
//     AuthController.resetPassword
// )

export const AuthRouter = router;
