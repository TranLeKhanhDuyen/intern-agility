import TaskListTemplate from '../templates/taskList-template';
import {
  CONFIRM_MESSAGE,
  ERROR_MESSAGE,
  SUCCESS_MESSAGE
} from '../constants/message';
import TaskDetailTemplate from '../templates/taskDetail-template';
import STATUS from '../constants/status';
import showSuccessMessage from '../utilities/showMessage';

export default class TaskListView {
  constructor() {
    this.formAddTask = document.querySelector('form.add-task');
    this.taskInput = this.formAddTask.querySelector('.task-input');
    this.taskList = document.querySelectorAll('.task-list');
    this.listTodo = document.querySelector('#todo');
    this.listProgress = document.querySelector('#progress');
    this.listDone = document.querySelector('#done');
    this.listArchived = document.querySelector('#archived');

    window.addEventListener('offline', () => this.handleOfflineStatus());
  }

  handleOfflineStatus() {
    alert(ERROR_MESSAGE.INTERNET_ERROR);
  }

  /**
   * Render all tasks from the API
   * @param {Array<Task>} tasks
   * @returns {void}
   */
  showTasks(tasks) {
    if (!tasks.length) return;

    this.tasks = tasks;

    // Get task list area
    this.listTodo.innerHTML = '';
    this.listProgress.innerHTML = '';
    this.listDone.innerHTML = '';
    this.listArchived.innerHTML = '';

    const taskStatus = Object.values(STATUS);

    [
      this.listTodo,
      this.listProgress,
      this.listDone,
      this.listArchived
    ].forEach((listElement, index) => {
      const filterTasks = tasks.filter(
        (task) => task.status === taskStatus[index]
      );
      listElement.innerHTML += TaskListTemplate.renderTaskList(filterTasks);
    });

    this.updateDraggableTasks();
  }

  bindAddTask(handle) {
    this.formAddTask.addEventListener('keydown', async (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();

        if (!navigator.onLine) return alert(ERROR_MESSAGE.INTERNET_ERROR);

        const newTaskName = this.taskInput.value.trim();

        if (!newTaskName) return alert(ERROR_MESSAGE.TASK_EMPTY);

        try {
          const newTask = await handle(newTaskName);

          this.listTodo.insertAdjacentHTML(
            'beforeend',
            TaskListTemplate.renderTaskList([newTask])
          );

          showSuccessMessage(SUCCESS_MESSAGE.ADD_SUCCESS);

          this.resetForm();

          const taskElement = document.querySelector(
            '.task-item-container:last-child'
          );

          taskElement.addEventListener('dragstart', this.dragStart.bind(this));
        } catch (error) {
          alert(ERROR_MESSAGE.SERVER_ERROR);
        }
      }
    });
  }

  resetForm() {
    this.taskInput.parentElement.reset();
  }

  // HANDLER TASK DETAIL

  getTaskItem(target) {
    return target.closest('.task-item-container');
  }

  //  HANDLE DRAG DROP

  updateDraggableTasks() {
    // Add event listeners for each task item
    const todos = document.querySelectorAll('.task-item-container');
    todos.forEach((task) => {
      task.addEventListener('dragstart', this.dragStart.bind(this));
    });
  }

  dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.id);
    // Add class to represent drag
    e.target.classList.add('dragged-task');
  }

  addBoardEvent(handler) {
    const taskBoards = document.querySelectorAll('.task-board');
    taskBoards.forEach((board) => {
      board.addEventListener('dragover', this.dragOver.bind(this));
      board.addEventListener('drop', (e) => this.dragDrop(e, handler));
    });
  }

  dragOver(e) {
    e.preventDefault();
  }

  dragDrop = async (e, handler) => {
    e.preventDefault();

    if (!navigator.onLine) return alert(ERROR_MESSAGE.INTERNET_ERROR);

    const taskId = e.dataTransfer.getData('text/plain');
    const draggedTask = document.querySelector(`[data-id="${taskId}"]`);
    const targetBoard = e.target.closest('.task-board');

    if (targetBoard && draggedTask) {
      // Check and set default value for targetBoard.id
      const targetBoardId = targetBoard.id || 'js-default';
      const newStatus = targetBoardId.split('js-')[1] || 'todo';
      handler(taskId, { status: newStatus });
      // Move taskItem to new state
      draggedTask.parentNode.removeChild(draggedTask);
      targetBoard.querySelector('.task-list').appendChild(draggedTask);
    }
  };

  //  HANDLE DELETE

  bindDelete(handleDelete) {
    this.taskList.forEach((taskList) => {
      taskList.addEventListener('click', async (e) => {
        const deleteButton = e.target.closest('.delete');

        if (!deleteButton) return;

        if (!navigator.onLine) return alert(ERROR_MESSAGE.INTERNET_ERROR);

        const taskItem = this.getTaskItem(deleteButton);

        if (!taskItem) return;
        const taskId = taskItem.dataset.id;

        const userConfirmed = confirm(CONFIRM_MESSAGE.DELETE_TASK);

        if (!userConfirmed) return;
        try {
          const status = await handleDelete(taskId);

          if (status !== 200) return alert(ERROR_MESSAGE.DELETE_FAIL);

          taskItem.remove();

          showSuccessMessage(SUCCESS_MESSAGE.DELETE_SUCCESS);
        } catch (error) {
          alert(error);
        }
      });
    });
  }

  bindSearchTask() {
    const searchInput = document.querySelector('.search-input');
    const taskElements = document.getElementsByClassName('task-item-container');

    searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredTasks = this.tasks.filter(
        (task) =>
          task.taskName && task.taskName.toLowerCase().includes(searchTerm)
      );

      Array.from(taskElements).forEach((task) => {
        const isInSearchArr = filteredTasks.some(
          (item) => item.id === +task.dataset.id
        );

        if (isInSearchArr) {
          task.style.display = 'block';
          return;
        }

        task.style.display = 'none';
      });
    });
  }

  bindTaskDetail(handleInitEvent, handleFind, handleGetAllComments) {
    this.taskList.forEach((taskList) => {
      taskList.addEventListener('click', async (e) => {
        const taskItem = this.getTaskItem(e.target);

        if (e.target.closest('.delete')) return;

        if (!taskItem) return;

        if (!navigator.onLine) return alert(ERROR_MESSAGE.INTERNET_ERROR);

        const taskId = taskItem.dataset.id;
        const selectedTask = await handleFind(taskId);
        const comments = await handleGetAllComments(+taskId);

        if (!handleInitEvent) return;

        this.renderTaskDetail(selectedTask, comments, handleInitEvent);

        const closeIcons = document.querySelectorAll('.close-icon');
        closeIcons.forEach((closeIcon) => {
          closeIcon.addEventListener('click', () => {
            this.closeTaskDetail();
          });
        });
      });
    });
  }

  renderTaskDetail(selectedTasks, comments, handleInitTaskDetailEvent) {
    const overlay = document.querySelector('.overlay');

    document.body.insertBefore(
      overlay,
      document.querySelector('.detail-container')
    );

    const detailContainer = document.querySelector('.detail-container');

    overlay.style.display = 'block';

    detailContainer.innerHTML = TaskDetailTemplate.renderTaskDetail(
      selectedTasks,
      comments
    );

    //Init all event for task detail
    handleInitTaskDetailEvent();
  }

  closeTaskDetail() {
    const detailContainers = document.querySelectorAll(
      '.detail-task-container'
    );
    const overlay = document.querySelector('.overlay');

    detailContainers.forEach((detailContainer) => {
      if (!detailContainer) return;
      detailContainer.classList.add('hidden');
      overlay.style.display = 'none';
    });
  }
}
