// Get the switch and status text elements
const blockSwitch = document.getElementById('blockSwitch');
const switchStatus = document.getElementById('switchStatus');

// Load the current state of the blocker from storage
chrome.storage.local.get('blockerEnabled', (data) => {
  const isEnabled = data.blockerEnabled !== undefined ? data.blockerEnabled : true;
  blockSwitch.checked = isEnabled;
  updateSwitchStatus(isEnabled);
});

// Update the switch status text
function updateSwitchStatus(isEnabled) {
  switchStatus.textContent = isEnabled ? 'Blocking is ON' : 'Blocking is OFF';
}

// Add event listener to the switch
blockSwitch.addEventListener('change', () => {
  const isEnabled = blockSwitch.checked;
  chrome.storage.local.set({ blockerEnabled: isEnabled });
  updateSwitchStatus(isEnabled);
});