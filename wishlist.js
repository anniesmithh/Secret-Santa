// Wishlist Manager with JSONBin.io Backend
// This allows wishlists to be shared across all devices

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
let wishlists = null;
let isLoading = false;

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

// API Functions
async function getWishlists() {
    if (wishlists) return wishlists;
    
    try {
        const response = await fetch(`${CONFIG.API_URL}/b/${CONFIG.BIN_ID}/latest`, {
            method: 'GET',
            headers: {
                'X-Master-Key': CONFIG.API_KEY
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch wishlists');
        }
        
        const data = await response.json();
        wishlists = data.record;
        return wishlists;
    } catch (error) {
        console.error('Error fetching wishlists:', error);
        // Fallback to localStorage if API fails
        return getLocalWishlists();
    }
}

async function saveWishlists(updatedWishlists) {
    try {
        const response = await fetch(`${CONFIG.API_URL}/b/${CONFIG.BIN_ID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': CONFIG.API_KEY
            },
            body: JSON.stringify(updatedWishlists)
        });
        
        if (!response.ok) {
            throw new Error('Failed to save wishlists');
        }
        
        wishlists = updatedWishlists;
        // Also save to localStorage as backup
        localStorage.setItem('secretSantaWishlists', JSON.stringify(updatedWishlists));
        return true;
    } catch (error) {
        console.error('Error saving wishlists:', error);
        alert('Failed to save wishlist. Please check your internet connection and try again.');
        return false;
    }
}

// Fallback to localStorage
function getLocalWishlists() {
    const stored = localStorage.getItem('secretSantaWishlists');
    if (stored) {
        return JSON.parse(stored);
    }
    return INITIAL_WISHLISTS;
}

async function selectPerson(name) {
    currentPerson = name;
    currentPersonName.textContent = name;
    await displayWishlist();
    showScreen(wishlistScreen);
}

async function displayWishlist() {
    if (isLoading) return;
    
    isLoading = true;
    showLoadingState();
    
    try {
        const allWishlists = await getWishlists();
        const items = allWishlists[currentPerson] || [];
        
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
                    <span class="item-text">${escapeHtml(item)}</span>
                    <button class="remove-item-btn" onclick="removeItem(${index})">×</button>
                `;
                wishlistItems.appendChild(li);
            });
        }
    } catch (error) {
        console.error('Error displaying wishlist:', error);
        alert('Failed to load wishlist. Please refresh the page.');
    } finally {
        isLoading = false;
        hideLoadingState();
    }
}

async function addItem() {
    const item = itemInput.value.trim();
    
    if (item === '') {
        alert('Please enter an item!');
        return;
    }
    
    if (isLoading) return;
    
    isLoading = true;
    addItemBtn.disabled = true;
    addItemBtn.textContent = 'Adding...';
    
    try {
        const allWishlists = await getWishlists();
        
        if (!allWishlists[currentPerson]) {
            allWishlists[currentPerson] = [];
        }
        
        allWishlists[currentPerson].push(item);
        const success = await saveWishlists(allWishlists);
        
        if (success) {
            itemInput.value = '';
            itemInput.focus();
            await displayWishlist();
        }
    } catch (error) {
        console.error('Error adding item:', error);
        alert('Failed to add item. Please try again.');
    } finally {
        isLoading = false;
        addItemBtn.disabled = false;
        addItemBtn.textContent = 'Add';
    }
}

async function removeItem(index) {
    if (isLoading) return;
    
    if (!confirm('Are you sure you want to remove this item?')) {
        return;
    }
    
    isLoading = true;
    
    try {
        const allWishlists = await getWishlists();
        allWishlists[currentPerson].splice(index, 1);
        const success = await saveWishlists(allWishlists);
        
        if (success) {
            await displayWishlist();
        }
    } catch (error) {
        console.error('Error removing item:', error);
        alert('Failed to remove item. Please try again.');
    } finally {
        isLoading = false;
    }
}

function showScreen(screen) {
    selectPersonScreen.classList.remove('active');
    wishlistScreen.classList.remove('active');
    screen.classList.add('active');
}

function showLoadingState() {
    wishlistItems.innerHTML = '<li style="text-align: center; color: #666;">Loading...</li>';
}

function hideLoadingState() {
    // Loading state is cleared by displayWishlist
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize
showScreen(selectPersonScreen);