
export interface Badge {
  id: number;
  badge_type: number;
  badge_name: string;
  description: string;
  image_url: string;
  created_at: string;
  updated_at?: string;
  distributed_count: number;
}

export interface BadgeRecipient {
  id: number;
  user_id: number;
  badge_id: number;
  awarded_at: string;
  awarded_by?: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  department: string;
  role: string;
}

export interface UserWithBadges extends User {
  badges: Badge[];
}
