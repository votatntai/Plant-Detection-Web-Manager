import { Student } from "./student.type";

export interface ClassStudent {
    createAt: string,
    joinAt?: string,
    status: string,
    description?: string,
    student: Student
}