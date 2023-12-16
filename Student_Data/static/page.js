function submitForm() {
    var formData = {
        name: document.getElementById('name').value,
        class: document.getElementById('class').value,
        section: document.getElementById('section').value,
        roll: document.getElementById('roll').value
    };

    console.log(formData);
}

if (window.ethereum) {
    const web3 = new Web3(window.ethereum);

    // Request account access if needed
    document.getElementById('submit').addEventListener('click', async () => {
        try {
            // Request permission to connect MetaMask
            await window.ethereum.enable();

            // Get the selected account from MetaMask
            const accounts = await web3.eth.getAccounts();
            const fromAddress = accounts[0];

            // Your contract and method details
            const contractAddress = '0x8963e0a40b940ecfa4afe8339d4d0e6140c0c9d6';  // Replace with your deployed contract address
            const contractABI = 
                [
					{
						"inputs": [
							{
								"internalType": "string",
								"name": "_name",
								"type": "string"
							}
						],
						"name": "Details",
						"outputs": [],
						"stateMutability": "nonpayable",
						"type": "function"
					},
					{
						"inputs": [
							{
								"internalType": "address",
								"name": "",
								"type": "address"
							}
						],
						"name": "formData",
						"outputs": [
							{
								"internalType": "string",
								"name": "name",
								"type": "string"
							}
						],
						"stateMutability": "view",
						"type": "function"
					}
				
            ];
            const contractInstance = new web3.eth.Contract(contractABI, contractAddress);

            // Your transaction details
            const name = document.getElementById('name').value;

            // Call the contract method and send the transaction
            const result = await contractInstance.methods.Details(name).send({ from: fromAddress });

            // Handle the transaction result
            console.log('Transaction Hash:', result.transactionHash);
            alert('Transaction confirmed!');

        } catch (error) {
            console.error('Error:', error.message);
        }
    });

} else {
    console.error('MetaMask not detected. Please install and connect MetaMask.');
}
