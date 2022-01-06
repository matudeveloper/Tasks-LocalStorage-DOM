const form = document.querySelector('form');
const taskInput = document.querySelector('#task');
const tasksList = document.querySelector('.collection');
const delTasksBtn = document.querySelector('#del-tasks');

form.addEventListener('submit', addTask);
tasksList.addEventListener('click', deleteTask);
delTasksBtn.addEventListener('click', deleteTasks);
document.addEventListener('DOMContentLoaded', getTasksFromLocalStorage);

function getTasksFromLocalStorage()
{
    let tasks;
    if(localStorage.getItem('tasks') === null )
    {
        tasks = [];
    } else
    {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    console.log(tasks);
    tasks.forEach(function (tasksElement)
    {
        const li = document.createElement('li');

        li.className = "collection-item";

        const text = document.createTextNode(tasksElement);

        li.appendChild(text);

        const link = document.createElement('a');

        link.setAttribute( 'href', '#');

        link.className = 'secondary-content';

        link.appendChild(document.createTextNode('X'));

        li.appendChild(link);

        const ul = document.querySelector('.collection');

        ul.appendChild(li);
    });
}
//console.log(taskInput);

function deleteTasks(e)
{
    while(tasksList.firstChild)
    {
        tasksList.removeChild(tasksList.firstChild)
    }

    deleteAllTaskFromLocalStorage();
}

function deleteAllTaskFromLocalStorage()
{
    if(localStorage.getItem('tasks') === null)
    {
        let tasks = [];
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    localStorage.removeItem('tasks');
}

function deleteTask(e)
{
    if (e.target.textContent == 'X')
    {
        if (confirm("do you want to delete this task ?")) {
            e.target.parentElement.remove();
            task = event.target.parentElement.firstChild.textContent;
            deleteTaskFromLocalStorage(task);
        }
    }
}

function deleteTaskFromLocalStorage(task)
{
    let tasks;
    if(localStorage.getItem('tasks') === null )
    {
        tasks = [];
    } else
    {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (tasksElement, index)
    {
        if(tasksElement === task)
        {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(e)
{
    const taskInput = document.querySelector('#task');
    
    const task = taskInput.value;

    const li = document.createElement('li');

    li.className = "collection-item";

    const text = document.createTextNode(task);

    li.appendChild(text);

    const link = document.createElement('a');

    link.setAttribute( 'href', '#');

    link.className = 'secondary-content';

    link.appendChild(document.createTextNode('X'));

    li.appendChild(link);

    const ul = document.querySelector('.collection');

    ul.appendChild(li);

    saveTask(task);

    taskInput.value = '';

    e.preventDefault();

}


function saveTask(task)
{
    let tasks;
    if(localStorage.getItem('tasks') === null )
    {
        tasks = [];
    } else
    {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}