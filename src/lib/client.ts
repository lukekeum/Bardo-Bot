import axios, { AxiosInstance, AxiosResponse } from 'axios';

class Client {
  private axios: AxiosInstance;

  constructor() {
    const { API_KEY = '' } = process.env;

    this.axios = axios.create({
      baseURL: process.env.API_BASE_URL,
      timeout: Number(process.env.API_REQUEST_TIMEOUT),
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Origin': 'https://developer.riotgames.com',
        'X-Riot-Token': API_KEY,
      },
    });
  }

  public async get(path: string, payload: any = null): Promise<AxiosResponse> {
    try {
      const response = await this.axios.get(path, payload);
      return response;
    } catch (err) {
      throw new Error(err);
    }
  }

  public async put(
    path: string,
    payload: any = null
  ): Promise<AxiosResponse | null> {
    try {
      const response = await this.axios.put(path, payload);
      return response;
    } catch (err) {
      throw new Error(err);
    }
  }

  public async post(
    path: string,
    payload: any = null
  ): Promise<AxiosResponse | null> {
    try {
      const response = await this.axios.post(path, payload);
      return response;
    } catch (err) {
      throw new Error(err);
    }
  }

  public async delete(
    path: string,
    payload: any = null
  ): Promise<AxiosResponse | null> {
    try {
      const response = await this.axios.delete(path, payload);
      return response;
    } catch (err) {
      throw new Error(err);
    }
  }
}

const client = new Client();

export default client;
