import date from '../utilities/date';
import STATUS from '../constants/status';

export interface TaskModel {
  taskName: string;
  description: string;
  dueDate: string;
  createdDate: string;
  status: string;
}

export const createTaskModel = (taskName: string): TaskModel => ({
  taskName: taskName,
  description: '',
  dueDate: date.getDueDate(),
  createdDate: date.getCurrentDate(),
  status: STATUS.TODO
});
