import { generateUUID,saveReference } from "../../config/config";
import { Request, Response } from "express";

export async function initiatePayment(req: Request, res: Response): Promise<void> {
  const uuid = generateUUID();
  saveReference(uuid);
  res.json({ id: uuid });
  
}