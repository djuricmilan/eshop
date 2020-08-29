import { Router } from "express";
import authRouter from './auth';
import productRouter from './product';
import categoryRouter from './category';
import shoppingCartRouter from './shoppingCart';

//application routes
let router = Router();
router.use('/auth', authRouter);
router.use('/product', productRouter);
router.use('/category', categoryRouter);
router.use('/cart', shoppingCartRouter);

export default router;