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
  officialChannel: boolean;
  content: string;
  contentType: string;
  impression: number;
  createdAt: string;
  __v: number;
  receivers: string[];
}

export interface SquealsInfo{
  _id: string;
  author: string;
  publicSqueal: boolean;
  officialChannel: boolean;
  content: string;
  contentType: string;
  impression: number;
  createdAt: string;
  convertedDate: string;
  posReac: number;
  negReac: number;
  __v: number;
  receivers: string[];
}

export interface GetReactionsResponse {
  posReac: number;
  negReac: number;
}

export interface FilterParams {
  orderBy: string;
  contentTypes: string[];
}
