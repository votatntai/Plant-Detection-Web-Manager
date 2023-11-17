import { Student } from "./student.type";

export interface ClassStudent {
    createAt: string,
    joinAt?: string,
    status: string,
    description?: string,
    reports: number,
    student: Student
}