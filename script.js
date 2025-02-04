// script.js

// Get DOM elements
const addMemberBtn = document.getElementById('addMemberBtn');
const nameInput = document.getElementById('name');
const contributionInput = document.getElementById('contribution');
const contributionTable = document.getElementById('contributionTable').getElementsByTagName('tbody')[0];
const totalAmountElement = document.getElementById('totalAmount');
const darkModeToggle = document.getElementById('darkModeToggle');
const infoButton = document.getElementById('infoButton');
const infoModal = document.getElementById('infoModal');
const closeModal = document.getElementById('closeModal');
const sidebar = document.getElementById('sidebar');
const openSidebar = document.getElementById('openSidebar');
const closeSidebar = document.getElementById('closeSidebar');

// Get and store the group members from localStorage
let groupMembers = JSON.parse(localStorage.getItem('groupMembers')) || [];

// Function to update the table
function updateTable() {
  contributionTable.innerHTML = ''; // Clear current table rows

  groupMembers.forEach(member => {
    const row = contributionTable.insertRow();
    row.insertCell(0).textContent = member.name;
    row.insertCell(1).textContent = `$${member.contribution.toFixed(2)}`;
  });

  const total = groupMembers.reduce((sum, member) => sum + member.contribution, 0);
  totalAmountElement.textContent = total.toFixed(2);
}

// Save to localStorage
function saveToLocalStorage() {
  localStorage.setItem('groupMembers', JSON.stringify(groupMembers));
}

// Event Listener for Adding Member
addMemberBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();
  const contribution = parseFloat(contributionInput.value.trim());

  if (!name || isNaN(contribution) || contribution <= 0) {
    alert("Please enter valid name and contribution amount.");
    return;
  }

  groupMembers.push({ name, contribution });
  saveToLocalStorage();
  nameInput.value = '';
  contributionInput.value = '';
  updateTable();
});

// Dark Mode Toggle
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Open Sidebar
openSidebar.addEventListener('click', () => {
  sidebar.style.left = "0";
});

// Close Sidebar
closeSidebar.addEventListener('click', () => {
  sidebar.style.left = "-250px";
});

// Information Modal
infoButton.addEventListener('click', () => {
  infoModal.style.display = "block";
});

closeModal.addEventListener('click', () => {
  infoModal.style.display = "none";
});

// Load saved data from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
  updateTable();
});