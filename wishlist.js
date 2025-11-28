// Wishlist data structure - stored in localStorage
// Format: { 'Annie': ['item1', 'item2'], 'Katie': ['item1'], ... }

// DOM elements
const selectPersonScreen = document.getElementById('selectPersonScreen');
const wishlistScreen = document.getElementById('wishlistScreen');
const currentPersonName = document.getElementById('currentPersonName');
const itemInput = document.getElementById('itemInput');
const addItemBtn = document.getElementById('addItemBtn');
const wishlistItems = document.getElementById('wishlistItems');
const itemCount = document.getElementById('itemCount');
const emptyMessage = document.getElementById('emptyMessage');
const backToSelectBtn = document.getElementById('backToSelectBtn');
const nameButtons = document.querySelectorAll('.name-btn');

// State
let currentPerson = '';

// Event listeners
nameButtons.forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        selectPerson(name);
    });
});

addItemBtn.addEventListener('click', addItem);
itemInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addItem();
    }
});

backToSelectBtn.addEventListener('click', () => {
    showScreen(selectPersonScreen);
    currentPerson = '';
});

// Functions
function getWishlists() {
    const stored = localStorage.getItem('secretSantaWishlists');
    if (stored) {
        return JSON.parse(stored);
    }
    // Initialize empty wishlists for all participants
    return {
        'Annie': [],
        'Katie': [],
        'Andy': [],
        'Michelle': [],
        'Raoul': [],
        'Joyce': [],
        'Vernon': []
    };
}

function saveWishlists(wishlists) {
    localStorage.setItem('secretSantaWishlists', JSON.stringify(wishlists));
}

function selectPerson(name) {
    currentPerson = name;
    currentPersonName.textContent = name;
    displayWishlist();
    showScreen(wishlistScreen);
}

function displayWishlist() {
    const wishlists = getWishlists();
    const items = wishlists[currentPerson] || [];
    
    wishlistItems.innerHTML = '';
    itemCount.textContent = items.length;
    
    if (items.length === 0) {
        emptyMessage.style.display = 'block';
    } else {
        emptyMessage.style.display = 'none';
        
        items.forEach((item, index) => {
            const li = document.createElement('li');
            li.className = 'wishlist-item';
            li.innerHTML = `
                <span class="item-text">${item}</span>
                <button class="remove-item-btn" onclick="removeItem(${index})">×</button>
            `;
            wishlistItems.appendChild(li);
        });
    }
}

function addItem() {
    const item = itemInput.value.trim();
    
    if (item === '') {
        alert('Please enter an item!');
        return;
    }
    
    const wishlists = getWishlists();
    
    if (!wishlists[currentPerson]) {
        wishlists[currentPerson] = [];
    }
    
    wishlists[currentPerson].push(item);
    saveWishlists(wishlists);
    
    itemInput.value = '';
    itemInput.focus();
    
    displayWishlist();
}

function removeItem(index) {
    const wishlists = getWishlists();
    wishlists[currentPerson].splice(index, 1);
    saveWishlists(wishlists);
    displayWishlist();
}

function showScreen(screen) {
    selectPersonScreen.classList.remove('active');
    wishlistScreen.classList.remove('active');
    screen.classList.add('active');
}

// Initialize
showScreen(selectPersonScreen);