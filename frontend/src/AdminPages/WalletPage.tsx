import React from 'react'
import Wallet from '../AdminComponent/Wallet/Wallet'
import { ToastContainer } from 'react-toastify';
import AdminLayout from '../AdminComponent/LayoutComponent/AdminLayout';

function WalletPage() {
  return (
    <div>
              <ToastContainer />
        <AdminLayout>
        <Wallet balance={0} currency={''} transactionHistory={[]}/>

        </AdminLayout>
    </div>
  )
}

export default WalletPage
