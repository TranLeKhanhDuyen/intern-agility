import TaskItemTemplate from "../template/taskItem-template";
import { ERROR_MESSAGE } from "../constants/message";
import TaskDetailTemplate from "../template/taskDetail-template";

export default class TaskItemView {
  constructor() {
    this.taskList = document.querySelector(".task-list");
    this.formAddTask = document.querySelector("form.add-task");
    this.taskInput = document.querySelector(".task-input");
    this.taskItem = document.querySelector(".task-item-container");
    this.taskDetail = document.querySelector(".detail-task-container");

    this.board = document.querySelector(".task-board");
    // Get tasks from API
    this.tasks = [];
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

  /* HANDLER TASK DETAIL */

  bindTaskDetail(handleUpdate, handleFind) {
    this.taskList.addEventListener("click", async (e) => {
      const taskItem = e.target.closest(".task-item-container");
      const taskId = taskItem.dataset.id;
      // const selectedTask = this.tasks.find(
      //   (task) => Number(task.id) === Number(taskId)
      // );
      const selectedTask = await handleFind(taskId)
      console.log(selectedTask);
      // console.log(handleUpdate);
      if (handleUpdate) {
        this.renderTaskDetail([selectedTask], handleUpdate);

        const closeIcons = document.querySelectorAll(".close-icon");
        closeIcons.forEach((closeIcon) => {
          closeIcon.addEventListener("click", () => {
            this.closeTaskDetail();
          });
        });
      }
    });
  }

  renderTaskDetail(selectedTask, handleUpdateTask) {
    const detailContainer = document.querySelector(".detail-container");
    // Render task detail
    detailContainer.innerHTML =
      TaskDetailTemplate.renderTaskDetail(selectedTask);
    // Add event update task
    handleUpdateTask();
  }

  closeTaskDetail() {
    const detailContainers = document.querySelectorAll(
      ".detail-task-container"
    );
    detailContainers.forEach((detailContainer) => {
      if (detailContainer) {
        detailContainer.classList.add("hidden");
      }
    });
  }
}
