import { getBaoContract, getLockedEarned } from 'bao/utils'
import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import useBao from '../base/useBao'
import useTransactionProvider from 'hooks/base/useTransactionProvider'

const useLockedEarnings = () => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account, library } = useWeb3React()
  const bao = useBao()
  const baoContract = getBaoContract(bao)
  const { transactions } = useTransactionProvider()

  const fetchBalance = useCallback(async () => {
    const balance = await getLockedEarned(baoContract, account)
    setBalance(new BigNumber(balance))
  }, [account, baoContract, bao])

  useEffect(() => {
    if (account && baoContract && bao) {
      fetchBalance()
    }
  }, [account, transactions, baoContract, setBalance, bao])

  return balance
}

export default useLockedEarnings
