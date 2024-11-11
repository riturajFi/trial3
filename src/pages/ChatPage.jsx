import { Web3Auth } from '@web3auth/modal';
import Chatbot from '../components/Chatbot';
import { useEffect, useState } from 'react';
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { useNavigate } from 'react-router-dom';

function Chat() {
  const clientId = "VYDh3cKkTV6gUfFHQAuzV87ZKHo6Vd6t";
  const [provider, setProvider] = useState(null);


  const [web3auth, setWeb3auth] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [userData, setUserData] = useState({}); // React Router's navigation hook


  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0xaa36a7",
            rpcTarget: "https://eth-sepolia.g.alchemy.com/v2/tiEhnsFVpY2MVCkwQHUsKReA5RGhS0x2",
          },
        });

        setWeb3auth(web3auth);
        await web3auth.initModal();
      } catch (error) {
        console.error("Initialization error:", error);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const res  = await web3auth.logout();
      console.log("res")
      navigate("/");
    } catch (error) {
      console.log(error)
    }
    
    setProvider(null);
    setAddress("");
    setUserData({});
    navigate("/"); // Navigate back to the login page
  };


  return (
    <div className="w-full flex flex-col min-h-full px-4 bg-gray-900 text-white">
      <header className="w-full max-w-5xl mx-auto sticky top-0 shrink-0 z-20 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Website Name */}
          <h1 className="text-lg font-bold text-indigo-400">PhoenixFi</h1>

          {/* Connect Wallet Button */}
          <button className="px-4 py-2 bg-indigo-600 text-white font-medium text-sm rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-gray-800" onClick={handleLogout}>
            Connect Wallet
          </button>
        </div>
      </header>
      <Chatbot />
    </div>
  );
}

export default Chat;
