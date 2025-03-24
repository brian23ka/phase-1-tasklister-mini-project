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

    if (taskDescription && taskPriority && taskUser && taskDuration && taskDueDate) {
      addTaskToList(taskDescription, taskPriority, taskUser, taskDuration, taskDueDate);
    }
  });

  // Function to add a task to the DOM
  function addTaskToList(taskDescription, taskPriority, taskUser, taskDuration, taskDueDate) {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');
    
    // Create checkbox for marking completion
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.classList.add('task-checkbox');

    // Apply color based on priority
    const priorityColors = {
      high: 'red',
      medium: 'yellow',
      low: 'green'
    };
    taskItem.setAttribute('data-priority', taskPriority);
    taskItem.style.backgroundColor = priorityColors[taskPriority] || 'grey';

    // Add task details
    taskItem.innerHTML = `
      <span class="description"><strong>Description:</strong> ${taskDescription}</span><br>
      <span class="priority"><strong>Priority:</strong> ${taskPriority}</span><br>
      <span class="user"><strong>User:</strong> ${taskUser}</span><br>
      <span class="duration"><strong>Duration:</strong> ${taskDuration} hours</span><br>
      <span class="due-date"><strong>Due Date:</strong> ${taskDueDate}</span><br>
    `;

    // Append checkbox and buttons
    taskItem.prepend(checkBox);
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-btn');
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');
    
    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);

    // Append task to the task list
    taskList.appendChild(taskItem);

    // Clear form inputs
    form.reset();
  }

  // Event listener for deleting tasks
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
      event.target.parentElement.remove();
    }
  });

  // Event listener for editing tasks
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('edit-btn')) {
      const taskItem = event.target.parentElement;
      document.getElementById('new-task-description').value = taskItem.querySelector('.description').textContent.replace('Description: ', '');
      document.getElementById('task-priority').value = taskItem.querySelector('.priority').textContent.replace('Priority: ', '');
      document.getElementById('task-user').value = taskItem.querySelector('.user').textContent.replace('User: ', '');
      document.getElementById('task-duration').value = taskItem.querySelector('.duration').textContent.replace('Duration: ', '').replace(' hours', '');
      document.getElementById('task-due-date').value = taskItem.querySelector('.due-date').textContent.replace('Due Date: ', '');
      
      // Remove the task from the list
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

    const priorityOrder = { high: 1, medium: 2, low: 3 };

    tasks.sort((taskA, taskB) => {
      const priorityA = priorityOrder[taskA.getAttribute('data-priority')];
      const priorityB = priorityOrder[taskB.getAttribute('data-priority')];

      return order === 'asc' ? priorityA - priorityB : priorityB - priorityA;
    });

    // Re-append sorted tasks
    taskList.innerHTML = '';
    tasks.forEach(task => taskList.appendChild(task));
  }
});
