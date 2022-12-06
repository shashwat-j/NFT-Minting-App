import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './styles/App.css';
import twitterLogo from './assets/twitter-logo.svg';
import myEpicNft from './utils/MyEpicNFT.json';
//import { uploadFileToIPFS, uploadJSONToIPFS } from "./pinata";




// Constants
const TWITTER_HANDLE = 'whatshashwhat';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const COLLECTION_LINK = 'https://testnet.rarible.com/collection/0x56fB79899eB16F214b73dEed633AD128DAC17436';
const TOTAL_MINT_COUNT = 50;

const CONTRACT_ADDRESS = "0x56fB79899eB16F214b73dEed633AD128DAC17436";

const App = () => {

  /*
  * Just a state variable we use to store our user's public wallet. Don't forget to import useState.
  */
  const [currentAccount, setCurrentAccount] = useState("");
  const [nftCount, setNftCount] = useState("0");
  const [isMinting, setIsMinting] = useState(false);
  

  const checkNetwork = async () => {

    const {etherium} = window;
    let chainId = await ethereum.request({ method: 'eth_chainId' });
    console.log("Connected to chain " + chainId);

    // String, hex code of the chainId of the Goerli test network
    const goerliChainId = "0x5"; 
    if (chainId !== goerliChainId) {
	  alert("You are not connected to the Goerli Test Network!");
    return false;
    }
    return true;
  }
  
  
  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
    } else {
        console.log("We have the ethereum object", ethereum);
    }

    /*
    * Check if we're authorized to access the user's wallet
    */
    const accounts = await ethereum.request({ method: 'eth_accounts' });

    /*
    * User can have multiple authorized accounts, we grab the first one if its there!
    */
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);

      checkNetwork();
      setupEventListener()
    } else {
      console.log("No authorized account found");
    }
  }


const getNftCount = async () => {
  if(window.ethereum){
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myEpicNft.abi, signer);
    const no = await connectedContract.getNftCount();
    setNftCount(no.toString());
  }
}


const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      /*
      * Fancy method to request access to account.
      */
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      /*
      * Boom! This should print out public address once we authorize Metamask.
      */
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]); 

      checkNetwork();
      setupEventListener()
    } catch (error) {
      console.log(error);
    }
  }


    const setupEventListener = async () => {
      
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myEpicNft.abi, signer);

        connectedContract.on("NewEpicNFTMinted", (from, tokenId) => {
          console.log(from, tokenId.toNumber())
          alert(`Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on Rarible. Here's the link: https://testnet.rarible.com/token/${CONTRACT_ADDRESS}:${tokenId.toNumber()}`)
        });

        console.log("Setup event listener!")

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  
  const randomURI = () => {
    const URIs = ["ipfs://QmUMe82fDGXrDUu3VggHC4m2SRH5rNzughtTTQcYmENHWc","ipfs://QmTZcCA2tXq39f3njF2rXc2L1ksgnUJqA7BztqTfkYaWfe","ipfs://QmUs4xs4rSoUZ9qZoeTDrVXYJvgPaR8ijty9VW5n5THeoR","ipfs://QmVe1jjiynykz8B5Y76cRFYWikx36wxtiHu9xCRNqbayai"];
    return URIs[Math.floor(Math.random() * 4)];
  }
    
  
  const askContractToMintNft = async () => {

    const connectedToGoerli = await checkNetwork();
      if (!connectedToGoerli) {
        return;
      }

  try {
    const { ethereum } = window;

    if (ethereum) {

      setIsMinting(true);
      
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myEpicNft.abi, signer);

      console.log("Going to pop wallet now to pay gas...")
      let nftTxn = await connectedContract.makeAnEpicNFT(randomURI());

      console.log("Mining...please wait.")
      await nftTxn.wait();
      
      console.log(`Mined, see transaction: https://goerli.etherscan.io/tx/${nftTxn.hash}`);
      setIsMinting(false);

    } else {
      console.log("Ethereum object doesn't exist!");
      setIsMinting(false);
    }
  } catch (error) {
    console.log(error)
    setIsMinting(false);
  }
}

//tried to post svg to ipfs
// const myFunc = async()=>{
//   // let banana = "fd";
//   // let pine = await uploadFileToIPFS(banana);
//   // console.log(pine);
//    var request = new XMLHttpRequest();
//   request.open("GET", "./myImage.svg");
//   request.setRequestHeader("Content-Type", "image/svg+xml");
//   request.addEventListener("load", async function(event) {
//     var response = event.target.responseText;
//     var doc = new DOMParser();
//     var xml = doc.parseFromString(response, "image/svg+xml");
//     var rect = xml.getElementById("imagebot_2");
//     rect.setAttribute("stroke", "red");
//     var result = response.slice(0, response.indexOf("<svg"));
//     result += xml.documentElement.outerHTML;
//     var a = document.createElement("a");
//     a.download = "myImage.svg";
//     a.href = "data:image/svg+xml," + encodeURIComponent(result);
//     document.body.appendChild(a);
//     a.click();
    
//     var file = a;
//     try {
//             //upload the file to IPFS
//             const response = await uploadFileToIPFS(file);
//             if(response.success === true) {
//                 console.log("Uploaded image to Pinata: ", response.pinataURL)
//                 //setFileURL(response.pinataURL);
//             }
//         }
//         catch(e) {
//             console.log("Error during file upload", e);
//         }
//     document.body.removeChild(a);
//   });
//   request.send();
// }


  
  
  // Render Methods (we are basically just writing the return value so we are using parentheses and not curly braces)
  const renderNotConnectedContainer = () => (
    <>
    <p><button onClick={connectWallet} className="cta-button connect-wallet-button">
      Connect to Wallet
    </button></p>
    <p className="latest">This NFT was recently minted:</p>
        <nft-card contractAddress="0x56fb79899eb16f214b73deed633ad128dac17436" tokenId="4" network="rinkeby"> </nft-card>
        </>
  );

const renderMintUI = () => (
    <div>{isMinting ? <p className="sub-text">Minting your NFT...</p> :
     <> <button onClick={askContractToMintNft} className="cta-button connect-wallet-button">
             Mint NFT
      </button> <p className="sub-text">{nftCount} out of {TOTAL_MINT_COUNT} NFTs minted so far!</p>
     <p className="latest">The latest minted NFT:</p>
        <nft-card contractAddress="0x56fb79899eb16f214b73deed633ad128dac17436" tokenId={nftCount*1} network="rinkeby"> </nft-card>
     </>}</div>
    );

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  useEffect(()=> {
    getNftCount();
  })

    

  return (
     <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">Personality NFT</p>
          <p className="sub-text">
            A collection of magical NFTs that describe your personality. Mint yours!
          </p>
          {currentAccount === "" ? (
            renderNotConnectedContainer()
          ) : (
            renderMintUI()
          )}
          
          <a
            className="footer-text mt-2"
            href={COLLECTION_LINK}
            target="_blank"
            rel="noreferrer"
          >view NFT collection so far</a>
        </div>

        

        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built by @${TWITTER_HANDLE}🍍 with Buildspace`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
