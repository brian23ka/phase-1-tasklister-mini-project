document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('create-task-form');
  const taskList = document.getElementById('task-list');
  const sortAscButton = document.getElementById('sort-asc');
  const sortDescButton = document.getElementById('sort-desc');
  
  // Event listener for form submission
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevents form from reloading the page
    
    const taskDescription = document.getElementById('new-task-description').value;
    const taskPriority = document.getElementById('task-priority').value;
    const taskUser = document.getElementById('task-user').value;
    const taskDuration = document.getElementById('task-duration').value;
    const taskDueDate = document.getElementById('task-due-date').value;

    if (taskDescription && taskPriority && taskUser && taskDuration && taskDueDate){
    addTaskToList(taskDescription, taskPriority, taskUser, taskDuration, taskDueDate);  // Adds task to the list
    }
  });
  
  // Function to add a task to the DOM
  function addTaskToList(taskDescription ,taskPriority , taskUser, taskDuration, taskDueDate) {
    const taskList = document.getElementById('task-list');
    
    // Create a new task item
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');
        
    // Create checkbox for marking completion
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.classList.add('task-checkbox');
  
    
   // Apply color based on priority
   let priorityColor;
   switch (taskPriority) {
     case 'high':
       priorityColor = 'red';
       break;
     case 'medium':
       priorityColor = 'yellow';
       break;
     case 'low':
       priorityColor = 'green';
       break;
     default:
       priorityColor = 'grey';
   }
   taskItem.setAttribute('data-priority', taskPriority);
   taskItem.style.backgroundColor = priorityColor;


    // Add task description and delete button
    taskItem.innerHTML = `
    <span class="description"><strong>Description:</strong> ${taskDescription}</span><br>
    <span class="priority"><strong>Priority:</strong> ${taskPriority}</span><br>
    <span class="user"><strong>User:</strong> ${taskUser}</span><br>
    <span class="duration"><strong>Duration:</strong> ${taskDuration} hours</span><br>
    <span class="due-date"><strong>Due Date:</strong> ${taskDueDate}</span><br>
  `;
  
      // Append checkbox, task description, and delete button
    taskItem.prepend(checkBox);
    taskItem.innerHTML += `
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
  `;
  
    
    // Append task item to the task list
    taskList.appendChild(taskItem);
    // Clear the input field
    document.getElementById('new-task-description').value = '';
    document.getElementById('task-priority').value = 'medium'; // Reset priority to medium
    document.getElementById('task-user').value = '';
    document.getElementById('task-duration').value = '';
    document.getElementById('task-due-date').value = '';
  }

  
  // Event listener for deleting tasks
  document.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('delete-btn')) {
      const taskItem = event.target.parentElement;
      taskItem.remove();
    }
  });
    // Event listener for editing tasks
    document.addEventListener('click', (event) => {
      if (event.target && event.target.classList.contains('edit-btn')) {
        const taskItem = event.target.parentElement;
        const description = taskItem.querySelector('.description').textContent.replace('Description: ', '');
        const priority = taskItem.querySelector('.priority').textContent.replace('Priority: ', '');
        const user = taskItem.querySelector('.user').textContent.replace('User: ', '');
        const duration = taskItem.querySelector('.duration').textContent.replace('Duration: ', '').replace(' hours', '');
        const dueDate = taskItem.querySelector('.due-date').textContent.replace('Due Date: ', '');
        
        // Pre-fill the form with the task's existing values
        document.getElementById('new-task-description').value = description;
        document.getElementById('task-priority').value = priority;
        document.getElementById('task-user').value = user;
        document.getElementById('task-duration').value = duration;
        document.getElementById('task-due-date').value = dueDate;
  
        // Remove the task from the list (the user will submit an edited version)
        taskItem.remove();
      }
    });
    // Sort tasks in ascending order based on priority
    sortAscButton.addEventListener('click', () => {
      sortTasks('asc');
    });
    // Sort tasks in descending order based on priority
    sortDescButton.addEventListener('click', () => {
      sortTasks('desc');
    });
     // Function to sort tasks based on priority
  function sortTasks(order) {
    const tasks = Array.from(taskList.children);
    
    tasks.sort((taskA, taskB) => {
      const priorityA = taskA.getAttribute('data-priority');
      const priorityB = taskB.getAttribute('data-priority');
      
      const priorityOrder = {
        high: 1,
        medium: 2,
        low: 3
      };

      if (order === 'asc') {
        return priorityOrder[priorityA] - priorityOrder[priorityB]; // Sort in ascending order
      } else {
        return priorityOrder[priorityB] - priorityOrder[priorityA]; // Sort in descending order
      }
});
  // Clear the task list and append sorted tasks
  taskList.innerHTML = '';
  tasks.forEach(task => {
    taskList.appendChild(task);
  });
}
});