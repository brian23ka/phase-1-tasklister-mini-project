document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('createTaskForm');
  const taskList = document.getElementById('tasks');
   if (!form || !taskList) {
     console.error('Form or task list not found');
     return;
   }
  form.addEventListener('submit', function (event) {
        event.preventDefault();

        const taskInput = document.getElementById('taskInput');
         const newTask= document.createElement('li');

         newTask.appendChild(document.createTextNode(taskInput.value.trim())); 


        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => 
            taskList.removeChild(newTask));

        newTask.appendChild(deleteButton);
        taskList.appendChild(newTask);
        taskInput.value = '';
       }
      });
  });
  console.log("Task added",newTask.textContent);