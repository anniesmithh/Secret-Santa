// Pre-generated assignments with restrictions enforced
// Katie cannot draw Raoul, Raoul cannot draw Katie
// Michelle cannot draw Andy, Andy cannot draw Michelle
// Joyce cannot draw Vernon, Vernon cannot draw Joyce
const assignments = {
    'Annie': 'Joyce',
    'Katie': 'Andy',
    'Andy': 'Raoul',
    'Michelle': 'Katie',
    'Raoul': 'Michelle',
    'Joyce': 'Annie',
    'Vernon': 'Raoul'
};

// Track who has already drawn
const hasDrawn = new Set();

// DOM elements
const selectionScreen = document.getElementById('selectionScreen');
const confirmationScreen = document.getElementById('confirmationScreen');
const resultScreen = document.getElementById('resultScreen');
const selectedNameDisplay = document.getElementById('selectedName');
const recipientNameDisplay = document.getElementById('recipientName');

// Buttons
const nameButtons = document.querySelectorAll('.name-btn');
const confirmBtn = document.getElementById('confirmBtn');
const backBtn = document.getElementById('backBtn');
const resetBtn = document.getElementById('resetBtn');

// State
let currentSelectedName = '';

// Event listeners
nameButtons.forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        selectName(name);
    });
});

confirmBtn.addEventListener('click', confirmSelection);
backBtn.addEventListener('click', goBackToSelection);
resetBtn.addEventListener('click', resetToStart);

// Functions
function selectName(name) {
    // Check if this person has already drawn
    if (hasDrawn.has(name)) {
        alert(`${name} has already drawn their Secret Santa assignment!`);
        return;
    }
    
    currentSelectedName = name;
    selectedNameDisplay.textContent = name;
    
    // Switch to confirmation screen
    showScreen(confirmationScreen);
}

function confirmSelection() {
    if (!currentSelectedName) return;
    
    // Mark as drawn
    hasDrawn.add(currentSelectedName);
    
    // Get their assignment
    const recipient = assignments[currentSelectedName];
    recipientNameDisplay.textContent = recipient;
    
    // Show result screen
    showScreen(resultScreen);
    
    // Disable the button for this person
    nameButtons.forEach(button => {
        if (button.getAttribute('data-name') === currentSelectedName) {
            button.disabled = true;
            button.style.opacity = '0.5';
            button.style.cursor = 'not-allowed';
        }
    });
}

function goBackToSelection() {
    currentSelectedName = '';
    showScreen(selectionScreen);
}

function resetToStart() {
    currentSelectedName = '';
    showScreen(selectionScreen);
}

function showScreen(screen) {
    // Hide all screens
    selectionScreen.classList.remove('active');
    confirmationScreen.classList.remove('active');
    resultScreen.classList.remove('active');
    
    // Show the selected screen
    screen.classList.add('active');
}

// Initialize
showScreen(selectionScreen);