export interface User {
  id: string;
  email?: string;
  username?: string;
  avatar_url?: string;
  avatar_asset_id?: string;
  first_name: string;
  last_name: string;
  provider?: string;
  confirmed_at?: string;
  verified: boolean;
  verified_at?: string;
  external_id?: string;
  theme_preference?: string;
  created_at: string;
  updated_at: string;
}
