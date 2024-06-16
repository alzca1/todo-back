export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  dateCreated: Date;
  dateCompleted: Date | null;
}
