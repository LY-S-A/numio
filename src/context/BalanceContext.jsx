import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const BalanceContext = createContext();

export const BalanceProvider = ({ children }) => {
  const [balance, setBalance] = useState(0);
  const [loadingBalance, setLoadingBalance] = useState(true);

  const fetchBalance = useCallback(async () => {
    try {
      setLoadingBalance(true);

      const token = localStorage.getItem("token");

      if (!token) {
        setBalance(0);
        return;
      }

      const { data } = await axios.get(
        `${API_URL}/api/user/wallet`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBalance(data.balance || 0);
    } catch (error) {
      console.error("Failed to fetch wallet balance:", error);
      setBalance(0);
    } finally {
      setLoadingBalance(false);
    }
  }, []);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  const formattedBalance = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(balance);

  return (
    <BalanceContext.Provider
      value={{
        balance,
        formattedBalance,
        loadingBalance,
        setBalance,
        fetchBalance,
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
};

export const useBalance = () => useContext(BalanceContext);
