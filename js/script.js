{
    let tasks = [];
    let hideDoneTasks = false;
 
    const toggleShowTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };
 
    const focusAndClear = (newTask) => {
        newTask.value = "";
        newTask.focus();
    };
 
    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };
 
    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };
 
    const addNewTask = (newTaskContent,) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
    };
 
    const completeAllTasks = () => {
        tasks = tasks.map((task) => (
            { ...task, done: true }
        ));
        render();
    };
 
    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");
 
        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            })
        });
 
        const toggleDoneButtons = document.querySelectorAll(".js-done");
 
        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            })
        });
    };
 
    const renderTasks = () => {
        let htmlString = "";
 
        for (const task of tasks) {
            htmlString += `
            <li class="list ${task.done && hideDoneTasks === true ? "list__item--hidden" : ""}">
                <button class="js-done list__button list__button-done">
                ${task.done ? "✔" : ""}
                </button>
                <span class="list__item${task.done ? " list__content--done" : ""}">
                ${task.content} 
                </span>
                <button class="js-remove list__button-remove">
                🗑️
                </button>
            </li>
             `;
        };
 
        document.querySelector(".js-tasks").innerHTML = htmlString;
    };
 
    const bindButtonsEvents = () => {
        const completeAllButton = document.querySelector(".js-completeTasks");
 
        if (completeAllButton) {
            completeAllButton.addEventListener("click", completeAllTasks)
        }
 
        const hideShowButton = document.querySelector(".js-hideDoneTasks");
 
        if (hideShowButton) {
            hideShowButton.addEventListener("click", toggleShowTasks)
        };
 
    };
 
    const renderButtons = () => {
        let htmlButtons = "";
 
        if (tasks.length > 0) {
            htmlButtons += `
            <button class="HideShowButton js-hideDoneTasks">
                ${hideDoneTasks === false ? "Ukryj" : "Pokaż"} ukończone 
            </button>
            <button class="completeAllButton js-completeTasks"${tasks.every(({ done }) => done) ? "disabled" : ""}>
                Ukończ wszystkie
            </button>
            `;
        }
        document.querySelector(".js-buttons").innerHTML = htmlButtons;
    };
 
    const render = () => {
        renderTasks();
        bindEvents();
        renderButtons();
        bindButtonsEvents();
    };
 
    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTask = document.querySelector(".js-newTask");
        const newTaskContent = document.querySelector(".js-newTask").value.trim();
 
        if (newTaskContent === "") {
            return;
        }
        addNewTask(newTaskContent);
        focusAndClear(newTask);
    }
 
    const init = () => {
        render();
 
        const form = document.querySelector(".js-form");
 
        form.addEventListener("submit", onFormSubmit);
    };
 
    init();
}