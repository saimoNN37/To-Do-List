{
    const tasks = [
        {
            content: "nagrac filmik",
            done: false,
        },
        {
            content: "zrobic prace domową",
            done: true,
        },
    ];

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li>
               ${task.content}
            </li>
             `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const init = () => {
        render();
    };

    init();
}