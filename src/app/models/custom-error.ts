import { HttpStatusCode } from "@angular/common/http";

export interface CustomError {
  message: string;
  httpStatus: HttpStatusCode;
  status: number;
  timestamp: Date;
}
