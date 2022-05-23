import { getEarned, getFarms, getMasterChefContract } from 'bao/utils'
import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { provider } from 'web3-core'
import useBao from '../base/useBao'
import useTransactionProvider from 'hooks/base/useTransactionProvider'

const useAllEarnings = () => {
  const { transactions } = useTransactionProvider()
  const [balances, setBalance] = useState([] as Array<BigNumber>)
  const { account } = useWeb3React()
  const bao = useBao()
  const farms = getFarms(bao)
  const masterChefContract = getMasterChefContract(bao)

  const fetchAllBalances = useCallback(async () => {
    const balances: Array<BigNumber> = await Promise.all(
      farms.map(({ pid }: { pid: number }) =>
        getEarned(masterChefContract, pid, account),
      ),
    )
    setBalance(balances)
  }, [account, masterChefContract, bao])

  useEffect(() => {
    if (account && masterChefContract && bao) {
      fetchAllBalances()
    }
  }, [account, masterChefContract, setBalance, bao, transactions])

  return balances
}

export default useAllEarnings
