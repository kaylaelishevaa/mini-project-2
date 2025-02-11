import { Request, Response, NextFunction } from "express";
import fs from "node:fs/promises";

export default function errorMiddleware (
    error: Error,
    req: Request,
    res: Response, 
    next: NextFunction
) {
    console.error(error)
}
export async function logger(errorMessage: string) {
    try {
      const timestamp = new Date().toISOString();
      const logMessage = `${timestamp} - ${errorMessage}\n`;
      await fs.appendFile("logs/errors.log", logMessage, "utf-8");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`error writing to log file: ${error.message}`);
      }
    }
  }