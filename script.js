// Initialize close buttons for existing list items
function addCloseButton(item) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  item.appendChild(span);

  // Set up the click event for the close button
  span.onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
      saveTasks(); // Update storage when a task is removed
  };
}

// Load tasks from local storage on page load
function loadTasks() {
  var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
      var li = document.createElement("li");
      li.textContent = task.text;
      if (task.checked) li.classList.add("checked");
      li.classList.add(task.priority.toLowerCase());

      // Add due date if present
      if (task.dueDate) {
          var dueDateSpan = document.createElement("SPAN");
          dueDateSpan.className = "dueDate";
          dueDateSpan.textContent = "Due: " + task.dueDate;
          li.appendChild(dueDateSpan);
      }

      addCloseButton(li);
      document.getElementById("myUL").appendChild(li);
  });
}

// Save tasks to local storage
function saveTasks() {
  var tasks = [];
  var listItems = document.querySelectorAll("#myUL li");
  listItems.forEach(item => {
      var taskText = item.childNodes[0].textContent.replace("×", "").trim();
      var dueDate = item.querySelector(".dueDate") ? item.querySelector(".dueDate").textContent.replace("Due: ", "") : "";
      tasks.push({ 
          text: taskText, 
          checked: item.classList.contains("checked"), 
          priority: item.className.split(" ")[0],
          dueDate: dueDate
      });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to add a new list item
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);

  var dueDateValue = document.getElementById("dueDateInput").value;
  var priorityValue = document.getElementById("priorityInput").value;
  li.classList.add(priorityValue.toLowerCase());

  if (inputValue === '') {
      alert("You must write something!");
  } else {
      document.getElementById("myUL").appendChild(li);
      
      // Add due date
      if (dueDateValue) {
          var dueDateSpan = document.createElement("SPAN");
          dueDateSpan.className = "dueDate";
          dueDateSpan.textContent = "Due: " + dueDateValue;
          li.appendChild(dueDateSpan);
      }

      addCloseButton(li); // Add close button to the new item
      saveTasks(); // Save tasks to local storage
  }

  // Clear input fields
  document.getElementById("myInput").value = "";
  document.getElementById("dueDateInput").value = "";
}

// Toggle checked class when a list item is clicked
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
      ev.target.classList.toggle('checked');
      saveTasks(); // Save checked status
  }
}, false);

// Dark mode toggle function
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

// Load tasks on page load
window.onload = loadTasks;
