/**
 * Message for alert the error while fetching or rendering.
 */
export const ERROR_MESSAGE = {
  LOAD_ERROR: "Error when loading data",
  SERVER_ERROR: "Server Error! Please try again later",
  ADD_FAIL: "Task is empty",
  COMMENT_EMPTY: "Comment cannot be empty",
};

/**
 * Message for alert if the action be done successfully.
 */
export const SUCCESS_MESSAGE = {
  ADD_TASK: "Add task successfully",
  DELETE_TASK: "Delete task successfully",
};

export const ERROR_CODE = {
  // 4xx Client Error
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  408: "Request Timeout",
  429: "Too Many Requests",
  // 5xx Server Error
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
};
