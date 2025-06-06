import { useState } from 'react';
import { useAccount } from 'wagmi';
import { Dashboard } from './Dashboard';
import { DepositForm } from './forms/DepositForm';
import { WithdrawForm } from './forms/WithdrawForm';
import { BorrowForm } from './forms/BorrowForm';
import { RepayForm } from './forms/RepayForm';
import { ConnectButton } from './ConnectButton';

export const LendingDashboard = () => {
  const { isConnected } = useAccount();
  const [refresh, setRefresh] = useState(0);

  // Handler for successful transactions to trigger data refresh
  const handleSuccess = () => {
    setRefresh(prev => prev + 1);
  };
  
  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4">
        <div className="max-w-md w-full space-y-8 text-center">
          <h1 className="text-3xl font-bold">DeFi Lending Platform</h1>
          <p className="text-gray-500 mt-2 mb-6">Connect your wallet to use the platform</p>
          <ConnectButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Dashboard */}
        <Dashboard key={`dashboard-${refresh}`} />
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Deposit & Withdraw */}
          <div className="space-y-6">
            <DepositForm onSuccess={handleSuccess} />
            <WithdrawForm onSuccess={handleSuccess} />
          </div>
          
          {/* Borrow & Repay */}
          <div className="space-y-6">
            <BorrowForm onSuccess={handleSuccess} />
            <RepayForm onSuccess={handleSuccess} />
          </div>
        </div>
      </div>
    </div>
  );
}; 