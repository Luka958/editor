import { Router } from 'express';

export const router = Router();

router.get('/', (req, res) => {
  console.log("in open router")
  res.end();
});