import axios, { AxiosInstance, AxiosResponse } from 'axios';
import logger from '../config/winston';

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
      logger.error(err);
    }
    return (null as unknown) as AxiosResponse;
  }

  public async put(path: string, payload: any = null): Promise<AxiosResponse> {
    try {
      const response = await this.axios.put(path, payload);
      return response;
    } catch (err) {
      logger.error(err);
    }
    return (null as unknown) as AxiosResponse;
  }

  public async post(path: string, payload: any = null): Promise<AxiosResponse> {
    try {
      const response = await this.axios.post(path, payload);
      return response;
    } catch (err) {
      logger.error(err);
    }
    return (null as unknown) as AxiosResponse;
  }

  public async delete(
    path: string,
    payload: any = null
  ): Promise<AxiosResponse> {
    try {
      const response = await this.axios.delete(path, payload);
      return response;
    } catch (err) {
      logger.error(err);
    }
    return (null as unknown) as AxiosResponse;
  }
}

const client = new Client();

export default client;
