import express from 'express';
import UserController from './controller/UserController.js';

const router = express.Router();

// Define your routes here
router.get('/', (req, res) => {
    res.send('API is running...');
});

router.post("/register", UserController.store)
router.post("/login", UserController.login)

export default router;