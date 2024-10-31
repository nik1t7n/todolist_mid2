document.addEventListener('DOMContentLoaded', (event) => {
    // get all elements
    const addButton = document.getElementById('add-btn');
    const taskInput = document.getElementById('task-input');
    const taskContainer = document.getElementById('task-container');
    const clearButton = document.getElementById('clear-btn');

    // load tasks from local storage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            createTaskElement(task.text, task.completed);
        });
    };

    // save tasks to local storage
    const saveTasks = () => {

        // array of objects (task : checkbox value)
        const tasks = [];

        // get all current added tasks and load it to contemporary storafe
        document.querySelectorAll('.task').forEach(taskElement => {
            const text = taskElement.querySelector('.task-text').innerText;
            const completed = taskElement.querySelector('.task-checkbox').checked;
            tasks.push({ text, completed });
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    };


    // create task element
    const createTaskElement = (text, completed = false) => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');

        // setting up checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('task-checkbox');
        checkbox.checked = completed;
        checkbox.addEventListener('change', saveTasks);

        // setting up task text
        const taskText = document.createElement('span');
        taskText.classList.add('task-text');
        taskText.innerText = text;

        // setting up delete button
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', () => {
            taskDiv.remove();
            saveTasks();
        });

        // adding to real html
        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(taskText);
        taskDiv.appendChild(deleteButton);

        taskContainer.appendChild(taskDiv);
    };

    // add task on button click
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            createTaskElement(taskText);
            saveTasks();
            taskInput.value = '';
        }
    });

    // delete all tasks using clear button
    clearButton.addEventListener('click', () => {
        taskContainer.innerHTML = '';
        saveTasks();
    });


    // load tasks on page load
    loadTasks();
});

// costyil to save strikethrough when page reloaded
// document.addEventListener('DOMContentLoaded', () => {
//     document.querySelectorAll('.task').forEach(taskElement => {
//         const checkbox = taskElement.querySelector('.task-checkbox');
//         const taskText = taskElement.querySelector('.task-text');
//         if (checkbox.checked) {
//             taskText.style.textDecoration = 'line-through';
//         }
//     });
// });