export interface LoginResponse {
  accessToken: string;
  userid: string;
}
export interface UserData {
  _id: string;
  username: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
}

export interface GetCharsResponse {
  _id: string;
  dailyChar: number;
  monthlyChar: number;
  weeklyChar: number;
}
export interface Characters {
  daily: number;
  weekly: number;
  monthly: number;
}

export interface GetSquealsResponse {
  _id: string;
  author: string;
  publicSqueal: boolean;
  group: string[];
  officialChannel: boolean;
  content: string;
  contentType: string;
  impression: number;
  createdAt: string;
  __v: number;
}
export interface FilterParams {
  orderBy: string;
  contentTypes: string[];
}