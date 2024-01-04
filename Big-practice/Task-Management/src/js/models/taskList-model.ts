import API from '../services/task';
import { TaskModel, createTaskModel } from './task-model';

export default class TaskListModel {
  private apiTask: API;
  private tasks: TaskModel[];

  constructor() {
    this.apiTask = new API();
    this.tasks = [];
  }

  async getTasks(): Promise<TaskModel[]> {
    const response = await this.apiTask.getTask();
    this.tasks = response.data || [];
    return this.tasks;
  }

  private createTask(taskName: string): TaskModel {
    const newTask = createTaskModel(taskName);
    this.tasks.push(newTask);
    return newTask;
  }

  async addTask(taskName: string): Promise<any> {
    const newTask = this.createTask(taskName);
    const apiResponse = await this.apiTask.addTask(newTask);

    // Assuming data property holds the new task
    return apiResponse.data;
  }

  async delete(id: number): Promise<number | undefined> {
    const { status } = await this.apiTask.delete(id);

    if (status !== 200) return;
    return status;
  }

  async find(id: number): Promise<any> {
    const { status, data } = await this.apiTask.findTask(id);

    if (status !== 200) return;
    return data;
  }

  async edit(id: number, payload: any): Promise<void> {
    const response = await this.apiTask.edit(id, payload);

    if (response.status !== 200) return;
  }
}
