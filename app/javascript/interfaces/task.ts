export type StatusType = "ongoing" | "finished";

export type Task = {
  id: string;
  title: string;
  body: string;
  completed: boolean;
  created_at: Date;
  update_at: Date;
  status: StatusType;
};
