import api from "./axios";
const API_KEY = (import.meta.env.VITE_API_KEY as string)

export interface chainStartResponse {
  id: number,
  challenge_id: number
  user_id: number
  completed: boolean
}


export async function startChain(challenge_id: number, user_id: number): Promise<chainStartResponse> {
  try {
    const response = await api.post<chainStartResponse>(
      "/chains/start",
      { challenge_id, user_id },
      {
        headers: {
          "x-api-key": API_KEY,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error while calling API:", error.response?.data || error.message);
    throw error;
  }
}


export interface getChinResponse {
  id: number;
  user_id: number;
  challenge_id: number;
  node: [
    {
      id:number;
      word_id:number;
      word_text:string;
      status:string;

    }
  ]
  edges:[
    {
      id:number;
      from_node_id:number;
      to_node_id:number;
      link_type:string
      status:string;
    }
  ]
  paths:[
    {
      id:number;
      name:string;
      is_main:boolean;
      status:string;
      node:[
        {
          id:number;
          node_id:number;
          prev_path_node_id:number | null;
          next_path_node_id:number | null;
          position:number;
        }
      ]
    }
  ]
}



export interface responseAddNodeToChain {
  node:{
    id:number;
    word_id:number;
    word_text:string;
    status:string;
    created_at:string;
  },
  matched_node_id:number;
  similarity:number;
  percent:number;
  edge:{
    id:number;
    from_node_id:number;
    to_node_id:number;
    strength:number;
    relation_type:string;
    status:string;
    created_at:string;
  }
}
export async function getChain( chain_id: number): Promise<chainStartResponse> {
  try {
    const response = await api.get<chainStartResponse>(
      "/chains/" + chain_id,
      {
        headers: {
          "x-api-key": API_KEY,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error while calling API:", error.response?.data || error.message);
    throw error;
  }
}

export async function addNodeToChain(chain_id: number, word_id: number): Promise<responseAddNodeToChain> {
  try{
    const response = await api.post<responseAddNodeToChain>(
      "/chains/" + chain_id + "/nodes",
      {word_id:word_id},
      {
        headers: {
          "x-api-key": API_KEY,
        },
      }
    );
    console.log("response.data:", response.data);
    return response.data;
  }catch (error: any) {
    console.error("Error while calling API:", error.response?.data || error.message);
    throw error;
  }
}

