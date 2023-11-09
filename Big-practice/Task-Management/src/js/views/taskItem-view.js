import TaskItemTemplate from "../template/taskItem-template";
import TaskDetailTemplate from "../template/taskDetail-template";
import { ERROR_MESSAGE } from "../constants/message";

export default class TaskItemView {
  constructor() {
    this.taskList = document.querySelector(".task-list");
    this.formAddTask = document.querySelector("form.add-task");
    this.taskInput = document.querySelector(".task-input");
    this.todoBoard = document.getElementById("js-todo");
    // this.taskItem = document.querySelector(".task-item-container");

    // Get tasks from API
    this.tasks = [];
    this.handleTaskDetail();
  }

  resetForm() {
    this.taskInput.parentElement.reset();
  }

  showTaskItem() {
    // Get task list area
    const taskListDisplay = document.querySelector(".task-list");
    taskListDisplay.innerHTML = "";

    this.tasks.forEach((task) => {
      taskListDisplay.innerHTML += TaskItemTemplate.renderTaskItem([task]);
    });
  }

  bindAddTask(handle) {
    this.formAddTask.addEventListener("keydown", async (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const newTaskName = this.taskInput.value;
        const newTask = await handle(newTaskName);
        try {
          this.tasks = [...this.tasks, newTask];
          // Show the tasks
          this.showTaskItem();

          // Reset the form
          this.resetForm();
        } catch (error) {
          alert(ERROR_MESSAGE.ADD_FAIL);
        }
      }
    });
  }

  handleTaskDetail() {
    this.taskList.addEventListener("click", async (e) => {
      const taskItem = e.target.closest(".task-item-container");
      console.log(e.target);
      if (taskItem) {
        const taskId = taskItem.dataset.taskId;
        const selectedTask = this.tasks.find((task) => task.id === taskId);

        // Render task detail template
        const taskDetailContainer = document.querySelector(
          ".detail-task-container"
        );
        taskDetailContainer.innerHTML =
          TaskDetailTemplate.renderTaskDetail(selectedTask);
      }
    });
  }
}
