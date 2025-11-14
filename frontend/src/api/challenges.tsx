import api from "./axios";
const API_KEY = (import.meta.env.VITE_API_KEY as string)
export interface RandomResult {
    id: number;
    type: string;
    start:{
        id:number;
        text:string;
    };
    end:{
        id:number;
        text:string;
    }
    available_until: string;
} 

export async function ramdomChallenge(): Promise<RandomResult> {
  const response = await api.post<RandomResult>(
    "/challenges/random",
    null, 
    {
      headers: { "x-api-key": API_KEY },
    }
  );
  return response.data;
}

export async function ramdomHerChallenge(): Promise<RandomResult> {
  const response = await api.post<RandomResult>(
    "/challenges/her",
    null, 
    {
      headers: { "x-api-key": API_KEY },
    }
  );
  return response.data;
}