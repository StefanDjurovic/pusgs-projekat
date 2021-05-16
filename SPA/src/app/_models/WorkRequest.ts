import { Address } from "node:cluster";

export class WorkRequest {
    id: number;
    workType: string;
    address: Address;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    userId: number;
    additionalInfo: string;
    purpose: string;
    phoneNumber: string;
}
