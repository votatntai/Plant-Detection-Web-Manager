import { Student } from "./student.type";

export interface Report {
    id: string,
    student: Student,
    imageUrl: string,
    label: string,
    description?: string,
    status: string,
    createAt: string,
    note?: string
}