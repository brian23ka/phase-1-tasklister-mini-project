document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('create-task-form');
  
  // Event listener for form submission
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevents form from reloading the page
    
    const taskDescription = document.getElementById('new-task-description').value;
    if (taskDescription) {
      addTaskToList(taskDescription);  // Adds task to the list
    }
  });
  
  // Function to add a task to the DOM
  function addTaskToList(taskDescription) {
    const taskList = document.getElementById('task-list');
    
    // Create a new task item
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');
    
    // Add task description and delete button
    taskItem.innerHTML = `
      <span>${taskDescription}</span>
      <button class="delete-btn">Delete</button>
    `;
    
    // Append task item to the task list
    taskList.appendChild(taskItem);
    
    // Clear the input field
    document.getElementById('new-task-description').value = '';
  }
  
  // Event listener for deleting tasks
  document.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('delete-btn')) {
      const taskItem = event.target.parentElement;
      taskItem.remove();
    }
  });
});
