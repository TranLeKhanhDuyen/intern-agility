export default class Controller {
  constructor(taskListModel, taskItemView, taskDetailView) {
    this.taskListModel = taskListModel;
    this.taskItemView = taskItemView;
    this.taskDetailView = taskDetailView;
    this.init();
  }

  init() {
    this.handleAddTask();
    this.handleTaskDetail();
    this.handleUpdateTask();
  }

  async handleAddTask() {
    this.taskItemView.bindAddTask(async (task) => {
      return this.taskListModel.addTask(task);
    });
  }

  async handleTaskDetail() {
    this.taskItemView.bindTaskDetail(this.handleUpdateTask, (id) =>
      this.handleFindTask(id)
    );
  }

  handleFindTask = async (id) => {
    return this.taskListModel.find(id);
  };

  handleUpdateTask = () => {
    console.log("handleUpdateTask this: ", this);
    this.taskDetailView.bindUpdateTask(async (id, updateData) => {
      return this.taskListModel.edit(id, updateData);
    });
  };
}
