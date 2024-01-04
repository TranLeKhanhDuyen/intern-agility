import date from '../utilities/date';

// Defined data type
interface CommentModel {
  comment: string | number;
  taskId: number;
  timeStamp: number;
  timeAgo: string;
}

const createCommentModel = (commentValue: string, taskId): CommentModel => ({
  comment: commentValue,
  taskId,
  timeStamp: Date.now(),
  timeAgo: date.timeAgo(Date.now())
});

export default createCommentModel;
