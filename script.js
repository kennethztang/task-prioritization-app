let tasks = [];
let urgencyWeight = 50;
let difficultyWeight = 50;

function updateWeights() {
    urgencyWeight = parseInt(document.getElementById('urgencyWeight').value);
    difficultyWeight = 100 - urgencyWeight;

    updateWeightLabels();

    // Update the difficulty slider
    document.getElementById('difficultyWeight').value = difficultyWeight;
}

function updateWeightLabels() {
    document.getElementById('urgencyWeightLabel').textContent = urgencyWeight;
    document.getElementById('difficultyWeightLabel').textContent = difficultyWeight;
}

function addTaskInput() {
    const taskList = document.getElementById('taskList');

    const taskInput = document.createElement('div');
    taskInput.classList.add('taskInput');

    taskInput.innerHTML = `
        <label for="taskName">Task Name:</label>
        <input type="text" class="taskName" required>

        <label for="urgency">Urgency (1-5):</label>
        <input type="number" class="urgency" min="1" max="5" required>

        <label for="difficulty">Difficulty (1-5):</label>
        <input type="number" class="difficulty" min="1" max="5" required>
    `;

    taskList.appendChild(taskInput);
}

function submitTasks() {
    tasks = []; // Clear existing tasks

    // Get task inputs
    document.querySelectorAll('.taskInput').forEach((taskInput) => {
        const urgency = Number(taskInput.querySelector('.urgency').value);
        const difficulty = Number(taskInput.querySelector('.difficulty').value);

        const urgencyScore = urgency * (urgencyWeight);
        const difficultyScore = -difficulty * (difficultyWeight);
        const score = urgencyScore + difficultyScore;

        tasks.push({
            name: taskInput.querySelector('.taskName').value,
            score: score,
            completed: false,
        });
    });

    // Sort tasks by score
    tasks.sort((a, b) => b.score - a.score);

    // Display sorted tasks
    displaySortedTasks();
}

function clearTasks() {
    // Clear task input fields
    document.querySelectorAll('.taskName').forEach((input) => {
        input.value = '';
    });

    document.querySelectorAll('.urgency').forEach((input) => {
        input.value = '';
    });

    document.querySelectorAll('.difficulty').forEach((input) => {
        input.value = '';
    });

    // Hide the output section
    document.getElementById('outputSection').style.display = 'none';
    
    // Reset sliders to default values
    document.getElementById('urgencyWeight').value = 50;
    document.getElementById('difficultyWeight').value = 50;

    // Update slider labels
    updateWeightLabels();
    updateWeights();

}

function displaySortedTasks() {
    const sortedTasksList = document.getElementById('sortedTasks');
    sortedTasksList.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = 'task' + index;
        checkbox.addEventListener('change', () => {
            toggleTaskCompletion(index);
        });

        const taskLabel = document.createElement('label');
        taskLabel.htmlFor = 'task' + index;
        taskLabel.textContent = task.name + ' - Prioritization Score: ' + task.score;

        listItem.appendChild(checkbox);
        listItem.appendChild(taskLabel);

        if (task.completed) {
            listItem.style.textDecoration = 'line-through';
            checkbox.checked = true;
        }

        sortedTasksList.appendChild(listItem);
    });

    // Show the output section
    document.getElementById('outputSection').style.display = 'block';
}

function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    displaySortedTasks();
}