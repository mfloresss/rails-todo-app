export interface Team {
  id: number;
  user_id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}
export interface InvitationTeam {
  id: number;
  user_id: number;
  team_id: number;
  confirm: boolean;
  created_at: Date;
  updated_at: Date;
  team: Team;
}
