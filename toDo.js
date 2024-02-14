let taskInput = document.getElementById("taskInput");
let addButton = document.getElementById("addButton");
let taskList = [];

addButton.addEventListener("click", addTask);

function addTask() {
    // let taskContent = taskInput.value;
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false,
    };
    taskList.push(task);
    console.log(taskList);
    render();
}

function render() {
    let resultHTML = '';
    for(let i=0; i < taskList.length; i++) {
        const taskClass = taskList[i].isComplete ? "task taskBackground" : "task";

        if (taskList[i].isComplete == true) {
            resultHTML += `<div class="${taskClass}">
            <div class="taskDone">${taskList[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${taskList[i].id}')">
                    <i class="fas fa-undo"></i>
                </button>
                <button onclick="deleteTask('${taskList[i].id}')">
                    <i class="far fa-window-close"></i>
                </button>
            </div>
        </div>`;
        } else {
                resultHTML += `<div class="${taskClass}">
            <div>${taskList[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${taskList[i].id}')">
                    <i class="fas fa-check"></i>
                </button>
                <button onclick="deleteTask('${taskList[i].id}')">
                    <i class="far fa-window-close"></i>
                </button>
            </div>
         </div>`;
        }
    }

    document.getElementById("taskBoard").innerHTML = resultHTML;
}

function toggleComplete(id) {
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render()
    console.log(taskList);
}

function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function deleteTask(id) {
    taskList = taskList.filter(task => task.id !== id);
    render(); 
}