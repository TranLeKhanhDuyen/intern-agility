import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../constants/message';
import { API_URL } from '../constants/url';
import APIHelper from './helper';

interface ApiResponse {
  status: number;
  message: string;
  data: any;
}

export default class API {
  private apiPath: string;

  constructor(apiPath: string = '/comments') {
    this.apiPath = apiPath;
  }

  async addComment(comment: any): Promise<ApiResponse> {
    try {
      const url = `${API_URL}${this.apiPath}`;
      const { response, result } = await APIHelper.createRequest(
        url,
        'POST',
        comment
      );

      return {
        status: response?.status || 500,
        message: SUCCESS_MESSAGE.ADD_SUCCESS,
        data: result
      };
    } catch (error) {
      return {
        status: error.status || 500,
        message: ERROR_MESSAGE.ADD_FAIL,
        data: null
      };
    }
  }

  async getComment(taskId: string): Promise<ApiResponse> {
    try {
      const url = `${API_URL}${this.apiPath}?taskId=${taskId}`;
      const { response, result } = await APIHelper.createRequest(
        url,
        'GET',
        null
      );

      return {
        status: response?.status || 500,
        message: SUCCESS_MESSAGE.GET_SUCCESS,
        data: result
      };
    } catch (error) {
      return {
        status: error.status || 500,
        message: ERROR_MESSAGE.LOAD_ERROR,
        data: null
      };
    }
  }

  async deleteComment(commentId: string): Promise<ApiResponse> {
    try {
      const url = `${API_URL}${this.apiPath}/${commentId}`;
      const { response } = await APIHelper.createRequest(url, 'DELETE', null);

      return {
        status: response?.status || 500,
        message: SUCCESS_MESSAGE.DELETE_SUCCESS,
        data: null
      };
    } catch (error) {
      return {
        status: error.status || 500,
        message: ERROR_MESSAGE.DELETE_FAIL,
        data: null
      };
    }
  }
}
