import api from "./axios";
const API_KEY = (import.meta.env.VITE_API_KEY as string)
export interface SearchResult {
    query: string;
    exists: boolean;
    matches:[
        {
            id: number;
            id_csv:number;
            t_search:string;
            t_entry:string;
            t_cat:string
        }
    ]
} 


export async function searchWord(term: string): Promise<SearchResult> {
    try {
      const response = await api.post<SearchResult>(
        "/search",
        { term },
        {
          headers: {
            "x-api-key": API_KEY,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error("Error while calling /search API:", error.response?.data || error.message);
      throw error;
    }
  }
