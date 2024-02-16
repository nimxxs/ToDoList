let taskInput = document.getElementById("taskInput");
let addButton = document.getElementById("addButton");
let tabs = document.querySelectorAll(".taskTabs div");
let taskList = [];
let mode = 'all';
let filterList = [];

// addButton.addEventListener("click", addTask);
addButton.addEventListener("click", function() {
    addTask();
    taskInput.value = "";
});
taskInput.addEventListener("focus", function() {
    taskInput.value = "";
})

for(let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click", function(event) {
        filter(event);
    });
}

// Enter 키 입력
function enterKey(event) {
    if(event.key === "Enter"){
        addTask();
        taskInput.value = "";
    }
}

function addTask() {
    // 유효성 검사 - 할 일을 입력해 주세요.
    if(taskInput.value.trim() === "") {
        return alert("할 일을 입력해 주세요.");
    }

    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    };
    taskList.push(task);
    console.log(taskList);
    render();
}
// UI
function render() {
    // 1. 내가 선택한 탭에 따라서
    let list = [];
    if(mode === "all") {
        // all -> taskList    
        list = taskList;
    } else if(mode === "onGoing") {
        // onGoing, done -> filterList
        list = taskList.filter(task => !task.isComplete);
    } else if(mode === "done") {
        list = taskList.filter(task => task.isComplete);
    }
    
    let resultHTML = '';
    for(let i=0; i < list.length; i++) {
        // 삼항연산자 사용해서 배경 지정
        const completeBG = list[i].isComplete ? "task taskBackground" : "task"

        if(list[i].isComplete == true) {
            resultHTML += `<div class="${completeBG}">
            <div class="taskDone">${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')" class="returnButton">
                <i class="fas fa-undo"></i>
                </button>
                <button onclick="deleteTask('${list[i].id}')" class="deleteButton">
                <i class="far fa-trash-alt"></i>
                </button>
            </div>
        </div>`;
        } else {
            resultHTML += `<div class="${completeBG}">
            <div>${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')" class="CompleteButton">
                <i class="far fa-check-circle"></i>
                </button>
                <button onclick="deleteTask('${list[i].id}')" class="deleteButton">
                <i class="far fa-trash-alt"></i>
                </button>
            </div>
        </div>`;
        }
    }
    // document.getElementById("taskBoard").innerHTML = resultHTML;

    // taskBoard의 내용 유무에 따른 스타일 적용을 위해 코드 수정
    const taskBoard = document.getElementById("taskBoard");
    taskBoard.innerHTML = resultHTML;

    if(taskBoard.innerHTML.trim() === "") {
        taskBoard.classList.remove("notEmpty");
    } else {
        taskBoard.classList.add("notEmpty");
    }
}

function toggleComplete(id) {
    for(let i=0; i<taskList.length; i++) {
        if(taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
    console.log(taskList);
}

function filter(event) {
    // underLine 위치
    if(event) {
        underLine.style.width = event.target.offsetWidth + "px";
        underLine.style.left = event.target.offsetLeft + "px";
        underLine.style.top = event.target.offsetTop + (event.target.offsetHeight - 12) + "px";
    }

    // 누구를 클릭했는지 event에 담겨있음
    mode = event.target.id;
    filterList = [];

    if(mode === "all") {
        // 전체 리스트 보여준다
        render()
    } else if(mode === "onGoing") {
        // 진행중 리스트 보여준다
        // 즉, task.isComplete=false 값
        for(let i=0; i<taskList.length; i++) {
            if(taskList[i].isComplete === false) {
                filterList.push(taskList[i])
            }
        }
        render();
    } else if(mode === "done"){
        // 끝남 리스트 보여준다
        // 즉, task.isComplete=true 값
        for(let i=0; i<taskList.length; i++) {
            if(taskList[i].isComplete === true) {
                filterList.push(taskList[i])
            }
        }
        render();
    }
}

function deleteTask(id) {
    // 배열 아이템을 삭제해야함
    // 필터로 걸러서 다시 새 배열에 담는다!
    taskList = taskList.filter(task => task.id !== id);
    render();
}

function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}