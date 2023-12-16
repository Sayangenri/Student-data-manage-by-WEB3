document.getElementById('metamaskButton').addEventListener('click', async () => {
    // Check if MetaMask is installed
    if (window.ethereum) {
      try {
        // Request account access if needed
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        window.location.href = 'page';
      } catch (error) {
        console.error('Error connecting to MetaMask:', error.message);
      }
    } else {
      console.error('MetaMask extension not detected');
    }
  });
  