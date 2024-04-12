import SubjectResponse from "./SubjectResponse";

export interface MarksResponse {
    subject: SubjectResponse,
    subjectMark: number,
    assignmentMarks: AssignmentMarkResponse[],
};

interface AssignmentMarkResponse {
    assignment: AssignmentResponse,
    mark: number,
};

interface AssignmentResponse {
    id: string,
    subjectId: string,
    title: string,
    maxMark: number,
    openingDate: Date,
    closingDate: Date,
    duration: TimeRanges,
};