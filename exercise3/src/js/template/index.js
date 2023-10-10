import editIcon from "../../assets/icons/vertical-ellipsis.png";

export default class TaskTemplate {
    constructor() {}
    static renderTask = (newTask) =>
        `<li class="task-item" data-id="${newTask.id}" >
            <div class="task-wrapper task-check">
                 <span class="icon-checked"></span>
                 <p class="task-name">${newTask.taskNameDisplay}</p>
            </div>
            <div class="task-wrapper">
                <div class="task-item-done">
                <span class="task-actual">0</span>
                <span>/</span>
                <span class="task-est">${newTask.est}</span>
            </div>
            <button class="btn-more btn-show-task ">
            <img src="${editIcon}" alt="icon more" class="icon-more edit">
            </button>
      </div>
    </li>
    `;
}