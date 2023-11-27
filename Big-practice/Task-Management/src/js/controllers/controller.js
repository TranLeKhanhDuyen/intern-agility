export default class Controller {
  constructor(taskListModel, taskItemView, taskDetailView) {
    this.taskListModel = taskListModel;
    this.taskItemView = taskItemView;
    this.taskDetailView = taskDetailView;
    this.init();
  }

  async init() {
    this.taskItemView.syncTasks().then(() => {
      // const tasks = await this.taskListModel.syncTasks();
      // await this.taskItemView.showTaskItem(tasks).then(() => {
      this.handleAddTask();
      this.handleDragDropBoard();
      this.handleTaskDetail();
      this.handleUpdateTask();
    });
  }

  handleAddTask = () => {
    this.taskItemView.bindAddTask(
      async (task) => {
        return await this.taskListModel.addTask(task);
      },
      async (taskId, newStatus) => {
        return await this.taskListModel.edit(taskId, newStatus);
      }
    );
  };

  handleDragDropBoard = () => {
    this.taskItemView.addBoardEvent(async (taskId, newStatus) => {
      const res = await this.taskListModel.edit(taskId, newStatus);
      const tasks = await this.taskListModel.getTask();
      this.taskItemView.revalidateTasks(tasks);
      return res;
    });
  };

  handleTaskDetail = () => {
    this.taskItemView.bindTaskDetail(this.handleUpdateTask, (id) =>
      this.handleFindTask(id)
    );
  };

  handleFindTask = (id) => {
    return this.taskListModel.find(id);
  };

  handleUpdateTask = () => {
    this.taskDetailView.bindUpdateTask((id, updateData) => {
      // data: task list
      const data = this.taskListModel.edit(id, updateData);
      this.taskItemView.renderListTask(data);
    });
  };
}
