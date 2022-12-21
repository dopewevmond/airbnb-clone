import axios from 'axios'

export async function axiosClient<ResponseType>(url: string, requestData?: any, accessToken?: string): Promise<ResponseType> {
  const { data } = await axios.post<ResponseType>(url, requestData, {
    headers: {
      'content-type': 'application/json',
      'authorization': `Bearer ${accessToken}`
    }
  })
  return data
}