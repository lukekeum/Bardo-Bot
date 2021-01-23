import axios, { AxiosInstance, AxiosResponse } from 'axios';

class Client {
  private axios: AxiosInstance;
  private authUserHeader: () => object;

  constructor() {
    this.axios = axios.create({
      baseURL: process.env.API_BASE_URL,
      timeout: Number(process.env.API_REQUEST_TIMEOUT),
      headers: {
        'Content-Type': 'application/json',
        ...this.authUserHeader,
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
