const MoodContractAddress = "0xBE461Dc89CF24D6889b3c4c405f124279d856aFA";
const MoodContractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_mood",
				"type": "string"
			}
		],
		"name": "setMood",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMood",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

let MoodContract;
let signer;
let currentMood = document.getElementById("current-mood");
const provider = new ethers.providers.Web3Provider(window.ethereum, "ropsten");

provider.send("eth_requestAccounts", []).then(() => {
    provider.listAccounts().then((accounts) => {
      signer = provider.getSigner(accounts[0]);
      MoodContract = new ethers.Contract(
        MoodContractAddress,
        MoodContractABI,
        signer
      );
    });
  });

  async function getMood() {
    displayPleaseWait();
    const getMoodPromise = MoodContract.getMood();
    const Mood = await getMoodPromise;
    console.log(Mood);
    displayMood(Mood);
  }
  
  async function setMood() {
    const mood = document.getElementById("mood").value;
    if (mood.length === 0) return;
    displayPleaseWait();
    const setMoodPromise = MoodContract.setMood(mood);
    await setMoodPromise;
    displayMood(mood);
  }

  function displayMood(mood) {
    currentMood.innerText = `Current mood: ${mood}`;
  }

  function displayPleaseWait() {
    currentMood.innerText = "Please wait... ⏳"
  }