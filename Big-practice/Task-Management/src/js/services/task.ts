import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../constants/message';
import { API_URL } from '../constants/url';
import APIHelper from './helper';

interface ApiRespone {
  status: number;
  message: string;
  data: any;
}

export default class API {
  private apiPath: string;

  constructor(apiPath: string = '/tasks') {
    this.apiPath = apiPath;
  }

  async addTask(taskName: any): Promise<ApiRespone> {
    try {
      const url = `${API_URL}${this.apiPath}`;
      const { response, result } = await APIHelper.createRequest(
        url,
        'POST',
        taskName
      );

      return {
        status: response?.status || 500,
        message: SUCCESS_MESSAGE.ADD_SUCCESS,
        data: result
      };
    } catch (error) {
      return {
        status: error.status,
        message: ERROR_MESSAGE.ADD_FAIL,
        data: null
      };
    }
  }

  async getTask() {
    try {
      const url = `${API_URL}${this.apiPath}`;
      const { response, result } = await APIHelper.createRequest(url, 'GET', null);

      return {
        status: response?.status || 500,
        message: SUCCESS_MESSAGE.GET_SUCCESS,
        data: result
      };
    } catch (error) {
      const status = error.status;
      return {
        status,
        message: ERROR_MESSAGE.LOAD_ERROR,
        data: null
      };
    }
  }

  async findTask(id) {
    try {
      const url = `${API_URL}${this.apiPath}/${id}`;
      const { response, result } = await APIHelper.createRequest(url, 'GET');

      return {
        status: response.status,
        data: result
      };
    } catch (error) {
      const status = error.status;
      return {
        status,
        message: ERROR_MESSAGE.SERVER_ERROR,
        data: null
      };
    }
  }

  async edit(id, updateData) {
    try {
      const url = `${API_URL}${this.apiPath}/${id}`;
      const { response } = await APIHelper.createRequest(
        url,
        'PATCH',
        updateData
      );

      return {
        status: response.status,
        message: SUCCESS_MESSAGE.UPDATE_SUCCESS
      };
    } catch (error) {
      const status = error.status;
      return {
        status,
        message: ERROR_MESSAGE.SERVER_ERROR
      };
    }
  }

  async delete(id) {
    try {
      const url = `${API_URL}${this.apiPath}/${id}`;
      const { response } = await APIHelper.createRequest(url, 'DELETE');

      return {
        status: response.status,
        message: SUCCESS_MESSAGE.DELETE_SUCCESS
      };
    } catch (error) {
      const status = error.status;
      return {
        status,
        message: ERROR_MESSAGE.DELETE_FAIL
      };
    }
  }
}
