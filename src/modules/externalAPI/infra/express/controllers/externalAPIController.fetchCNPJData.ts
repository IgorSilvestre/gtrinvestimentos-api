import { Request, Response } from "express";
import axios from "axios";

export async function fetchCNPJData(req: Request, res: Response) {
  const { cnpj } = req.params;
  try {
    const response = await axios.get(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`);
    const data = response.data;
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "Error fetching data" });
  }
}
