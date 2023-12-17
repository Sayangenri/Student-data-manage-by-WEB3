const web3 = new Web3(window.ethereum);

// Contract ABI and address (replace with your contract details)
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_class",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_section",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_roll",
				"type": "uint256"
			}
		],
		"name": "setStudentData",
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
		"name": "studentData",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "class",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "section",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "roll",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}]; // Replace with your contract ABI
const contractAddress = '0xc1d7B55afbB25DE95f0A38c1d5F74A47a1a9424E'; // Replace with your contract address

// Create contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Function to submit form data to the blockchain
async function submitForm(){
    try {
        // Get form data
        const name = document.getElementById('name').value;
        const classValue = document.getElementById('class').value;
        const section = document.getElementById('section').value;
        const roll = document.getElementById('roll').value;
        alert("Wait for sometime :-) ")
        // Get the first account from the node (replace with your account handling logic)
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const userAddress = accounts[0];

        // Send transaction to the smart contract
        const transaction = await contract.methods.setStudentData(name, classValue, section, roll).send({
            from: userAddress
        });
		console.log('Transaction Hash:', transaction.transactionHash);
		alert('Data stored on the blockchain!');

    } catch (error) {
        console.error('Error submitting form:', error);
        alert('Error submitting form. Please check the console for details.');
    }
};

async function showTransactions() {
    try {
        // Get the Ethereum address from the user (replace this with your actual logic)
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        const userAddress = accounts[0]; // Use the first available account

        // Get transaction details
        const transactions = await web3.eth.getTransactionsByAddress(userAddress);

        // Extract and display relevant details for each transaction
        const transactionDetails = transactions.map(async (transactionHash) => {
            const tx = await web3.eth.getTransaction(transactionHash);
            const contractData = await contract.methods.studentData(tx.from).call();

            return {
                transactionHash: tx.hash,
                name: contractData.name,
                class: contractData.class,
                section: contractData.section,
                roll: contractData.roll,
            };
        });

        // Wait for all promises to resolve
        const allTransactionDetails = await Promise.all(transactionDetails);

        // Display transaction details (replace this with your display logic)
        console.log('All Transaction Details:', allTransactionDetails);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        alert('Error fetching transactions. Please check the console for details.');
    }
};