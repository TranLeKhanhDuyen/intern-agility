import TaskListModel from '../models/taskList-model';
import CommentListModel from '../models/commentList-model';
import TaskListView from '../views/taskList-view';
import TaskDetailView from '../views/taskDetail-view';

export default class Controller {
  taskListModel: TaskListModel;
  taskListView: TaskListView;
  taskDetailView: TaskDetailView;
  commentListModel: CommentListModel;

  constructor(
    taskListModel: TaskListModel,
    taskListView: TaskListView,
    taskDetailView: TaskDetailView,
    commentListModel: CommentListModel
  ) {
    this.taskListModel = taskListModel;
    this.taskListView = taskListView;
    this.taskDetailView = taskDetailView;
    this.commentListModel = commentListModel;
    this.init();
  }

  async init(): Promise<void> {
    await this.handleShowTask();
    this.handleAddTask();
    this.handleDelete();
    this.handleDragDropBoard();
    this.handleTaskDetail();
    this.handleSearch();
  }

  // Mount(Read): Model -> Controller -> View
  async handleShowTask(): Promise<void> {
    const tasks = await this.taskListModel.getTasks();
    this.taskListView.showTasks(tasks);
  }

  // View -> Controller -> Model
  handleAddTask(): void {
    this.taskListView.bindAddTask((task) => {
      return this.taskListModel.addTask(task);
    });
  }

  handleDelete(): void {
    this.taskListView.bindDelete((id) => {
      return this.taskListModel.delete(id);
    });
  }

  handleDragDropBoard(): void {
    this.taskListView.addBoardEvent(async (taskId, newStatus) => {
      await this.taskListModel.edit(taskId, newStatus);
    });
  }

  handleTaskDetail(): void {
    this.taskListView.bindTaskDetail(
      this.handleInitTaskDetailEvent,
      (id) => this.taskListModel.find(id),
      // Get all comments base on taskId
      async (taskId) => this.commentListModel.getComment(taskId)
    );
  }

  handleInitTaskDetailEvent(): void {
    // Edit description handler
    this.handleDescription();
    // Add comment handler
    this.handleAddComment();
    // Delete comment handler
    this.handleDeleteComment();
  }

  handleDescription(): void {
    this.taskDetailView.bindUpdateTask(async (id, updateData) => {
      await this.taskListModel.edit(id, updateData);
      return this.taskListModel.find(id);
    });
  }

  handleAddComment(): void {
    this.taskDetailView.bindComments(
      async (content, taskId) =>
        await this.commentListModel.addComment(content, taskId)
    );
  }

  handleDeleteComment(): void {
    this.taskDetailView.deleteComment(
      async (commentId) => await this.commentListModel.deleteComment(commentId)
    );
  }

  handleSearch(): void {
    this.taskListView.bindSearchTask();
  }
}
