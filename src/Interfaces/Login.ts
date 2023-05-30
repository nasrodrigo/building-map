export interface User {
    userName: string;
    password: string;
    isAdmin?: boolean;
}

export interface FeedbackMessage {
    msg: string;
    color: string;
}