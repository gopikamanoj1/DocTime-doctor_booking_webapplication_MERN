import React from 'react';

interface WalletProps {
  balance: number; // The current balance in the wallet
  currency: string; // Currency type (e.g., USD, EUR)
  transactionHistory: Array<{
    date: string;
    description: string;
    amount: number;
  }>; // A list of transactions
}

const Wallet: React.FC<WalletProps> = ({ balance, currency, transactionHistory }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-center">Wallet</h2>

      <div className="flex justify-between items-center my-4">
        <span className="text-xl font-medium">Balance:</span>
        <span className="text-xl font-bold">
          {currency} {balance.toFixed(2)}
        </span>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Transaction History</h3>
        <div className="mt-2">
          {transactionHistory.length === 0 ? (
            <p className="text-gray-500">No transactions found.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {transactionHistory.map((transaction, index) => (
                <li key={index} className="py-2 flex justify-between">
                  <span>{transaction.date}</span>
                  <span>{transaction.description}</span>
                  <span>{currency} {transaction.amount.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Deposit
        </button>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
          Withdraw
        </button>
      </div>

      <div className="mt-6 text-center">
        <a href="/wallet/details" className="text-blue-600 hover:underline">
          View Wallet Details
        </a>
      </div>
    </div>
  );
};

export default Wallet;
