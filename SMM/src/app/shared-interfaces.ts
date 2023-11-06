export interface LoginResponse {
  accessToken: string;
  userid: string;
}
export interface UserData {
  _id: string;
  username: string;
}

export interface GetCharsResponse {
  _id: string;
  dailyChars: number;
  monthlyChars: number;
  weeklyChars: number;
}
export interface Characters {
  daily: number;
  weekly: number;
  monthly: number;
}
