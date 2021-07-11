// import { Address } from "node:cluster";

import { Address } from "./Address";
import { Attachment } from "./Attachment";
import { ChangeEvent } from "./ChangeEvent";

export class WorkRequest {
    id: number;
    workType: string;
    address: Address;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    userId: number;
    isEmergency: boolean;
    additionalNotes: string;
    purpose: string;
    company: string;
    phoneNumber: string;
    attachments: Attachment[];
    history: ChangeEvent[];
}
