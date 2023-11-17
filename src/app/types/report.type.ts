import { Label } from "./label.type";
import { Student } from "./student.type";

export interface Report {
    id: string,
    student: Student,
    imageUrl: string,
    label: Label,
    description?: string,
    status: string,
    createAt: string,
    note?: string
}