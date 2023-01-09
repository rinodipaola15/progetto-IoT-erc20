//Connessione al wallet Metamask

import { useState, useEffect } from 'react'
import AppAuthenticated from "./components/AppAuthenticated"
const Web3 = require("web3");

const App = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [instruction, setInstruction] = useState("In attesa per la connessione con il wallet...");

  useEffect(() => {
    const connectWallet = async () => { //questa funzione proverà a connettersi al wallet
      if(!window.ethereum)
        return;

      try {
        await window.ethereum.send('eth_requestAccounts');
        window.web3 = new Web3(window.ethereum);
      } catch (error) {
        setInstruction("Connessione al Wallet rifiutata, ricarica la pagina per riprovare di nuovo.");
        return;
      }
      setInstruction("");
      setWalletConnected(true);
    };
    connectWallet();
  }, []);

  return (
    <div>
      {window.ethereum ?
        (walletConnected ?
          <AppAuthenticated/>
          : instruction)
        : "Metamask o un altri wallet conformi a EIP-1102 / EIP-1193 non trovati."
      }
    </div>
  )
}

export default App
