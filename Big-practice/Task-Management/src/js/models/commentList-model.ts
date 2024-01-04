import API from '../services/comment';
import createCommentModel from './comment-model';

export default class CommentListModel {
  private apiComment: API;

  constructor() {
    this.apiComment = new API();
  }

  async addComment(content: string, taskId: string): Promise<any> {
    const comment = createCommentModel(content, taskId);

    const apiResponse = await this.apiComment.addComment(comment);

    // Assuming data property holds the new task
    return apiResponse.data;
  }

  async getComment(commentId: string): Promise<any> {
    // Call the API to get task detail by ID
    const apiResponse = await this.apiComment.getComment(commentId);

    // Assuming data property holds the task detail
    return apiResponse.data;
  }

  async deleteComment(commentId: string): Promise<number | undefined> {
    const { status } = await this.apiComment.deleteComment(commentId);

    if (status !== 200) return;

    return status;
  }
}
