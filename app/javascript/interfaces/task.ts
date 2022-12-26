export type StatusType = "ongoing" | "finished";

export type Task = {
  id: number;
  user_id: number;
  team_id: number;
  title: string;
  body: string;
  created_at: Date;
  update_at: Date;
  status: StatusType;
  author_name: string;
  comments: Comments[];
};

export type Comments = {
  id: number;
  task_id: number;
  body: string;
  created_at: Date;
  update_at: Date;
  user_id: number;
};
