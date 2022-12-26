import { Team } from "./team";

export interface User {
  id: number;
  name: string;
  last_name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  teams: Team[] | [];
}
