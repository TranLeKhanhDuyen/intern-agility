import TaskItemTemplate from "../template/taskItem-template";
import { ERROR_MESSAGE } from "../constants/message";
import TaskDetailTemplate from "../template/taskDetail-template";
import APITask from "../services/task";

export default class TaskItemView {
  constructor() {
    this.formAddTask = document.querySelector("form.add-task");
    this.taskInput = document.querySelector(".task-input");
    this.taskDetail = document.querySelector(".detail-task-container");
    this.taskList = document.querySelector(".task-list");
    this.listTodo = document.querySelector("#todo");
    this.listProgress = document.querySelector("#progress");
    this.listDone = document.querySelector("#done");
    this.listArchived = document.querySelector("#archived");
    this.tasks = []; // lấy từ model
    // this.syncTasks().then(res=>res)
  }

  async syncTasks() {
    this.tasks =  await new APITask('/tasks').getTask().then(res => res.data) || [];
    // console.log(this.tasks)
  }

  resetForm() {
    this.taskInput.parentElement.reset();
  }

  showTaskItem(handleUpdate) {
    // Get task list area
    // this.taskList.innerHTML = "";
    this.listTodo.innerHTML = "";
    this.listProgress.innerHTML = "";
    this.listDone.innerHTML = "";
    this.listArchived.innerHTML = "";
    console.log([this.listTodo,this.listProgress,this.listDone,this.listArchived])
    // eslint-disable-next-line no-unexpected-multiline
    const taskStatus = ["todo","inprogress","done","archived"]
    Array.from([this.listTodo,this.listProgress,this.listDone,this.listArchived]).forEach((listElm,idx) => {
      const filterTasks = this.tasks.filter(task => task.status === taskStatus[idx])
      console.log(this.tasks)
      listElm.innerHTML += TaskItemTemplate.renderTaskItem(filterTasks);
    });
    // this.tasks.forEach((task) => {
    //   this.taskList.innerHTML += TaskItemTemplate.renderTaskItem([task]);
    // });

    this.updateDraggableTasks(handleUpdate);
  }

  bindAddTask(handle, handleUpdate) {
    this.showTaskItem(handleUpdate);
    this.formAddTask.addEventListener("keydown", async (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const newTaskName = this.taskInput.value;
        const newTask = await handle(newTaskName);
        try {
          this.tasks = [...this.tasks, newTask];
          // console.log(this.tasks)
          
          // Show the tasks
          this.showTaskItem(handleUpdate);
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
      const selectedTask = await handleFind(taskId);
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
  
  revalidateTasks(tasks) {
    this.tasks= tasks
  }

  renderTaskDetail(selectedTask, handleUpdateTask) {
    const detailContainer = document.querySelector(".detail-container");
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

  /* HANDLE DRAG DROP */
  //remove -> add
  updateDraggableTasks() {
    // Add event listeners for each task item
    const todos = document.querySelectorAll(".task-item-container");

    todos.forEach((task) => {
      task.addEventListener("dragstart", this.dragStart.bind(this));
      task.addEventListener("dragend", this.dragEnd.bind(this));
    });

    
    // 1 lan
    // const taskBoards = document.querySelectorAll(".task-board");
    // taskBoards.forEach((board) => {
    //   board.addEventListener("dragover", this.dragOver.bind(this));
    //   board.addEventListener("drop", (e) => this.dragDrop(e, handler));
    // });
  }


  addBoardEvent(handler) {
    // console.log('a;alskd;alskd')
    const taskBoards = document.querySelectorAll(".task-board");
    taskBoards.forEach((board) => {
      board.addEventListener("dragover", this.dragOver.bind(this));
      board.addEventListener("drop", (e) => this.dragDrop(e, handler));
    });
  }
  dragStart(e) {
    e.dataTransfer.setData("text/plain", e.target.dataset.id);
    // Add class to represent drag
    e.target.classList.add("dragged-task");
  }

  dragEnd() {
    // Remove the class when dragging ends
    // const draggedTasks = document.querySelectorAll(".dragged-task");
    // draggedTasks.forEach((draggedTask) => {
    //   draggedTask.classList.remove("dragged-task");
    // });

    // const draggedTasks = document.querySelectorAll(".dragged-task");

    // draggedTasks.forEach((draggedTask) => {
    //   draggedTask.classList.remove("dragged-task");
    //   const taskId = draggedTask.dataset.id;
    //     // console.log('dragEnd')
    //     // Check if the task is moved out of "todo"
    //     console.log('task:: ',this.tasks)
    //     console.log('taskId:: ',taskId)
    //     const isMovedOutOfTodo = this.tasks.findIndex(
    //       (task) => task.id === Number(taskId) && task.status === "todo"
    //       );
    //       console.log('dragEnd isMovedOutOfTodo:: ', isMovedOutOfTodo)

    //   if (isMovedOutOfTodo!==-1) {
    //     // Remove the task from the UI and the tasks array
    //     // draggedTask.remove();
    //     this.tasks = this.tasks.filter((task) => task.id !== taskId*1);
    //     // edit api -> get task
    //   }
    // });
  }

  dragOver(e) {
    e.preventDefault();
  }

  dragDrop = async (e, handler) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain");
    const draggedTask = document.querySelector(`[data-id="${taskId}"]`);
    const targetBoard = e.target.closest(".task-board");

    if (targetBoard && draggedTask) {
      // Check and set default value for targetBoard.id
      const targetBoardId = targetBoard.id || "js-default";
      const newStatus = targetBoardId.split("js-")[1] || null;

      handler(taskId, { status: newStatus });
      // Move taskItem to new state
      draggedTask.parentNode.removeChild(draggedTask);
      targetBoard.querySelector(".task-list").appendChild(draggedTask);
    }
  };
}
