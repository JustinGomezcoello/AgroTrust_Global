import express from 'express';
import { initiatePayment, verifyPayment } from '../../controllers/paymentController';

const paymentRoutes = express.Router();

paymentRoutes.post('/initiate-payment', initiatePayment);
paymentRoutes.post('/verify-payment', verifyPayment);

export default paymentRoutes;