import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import { getFarms, getMasterChefContract, getTotalLPWethValue, getWethContract } from '@/bao/utils'
import useTransactionProvider from '@/hooks/base/useTransactionProvider'
import { getContract } from '@/utils/erc20'

import useBao from '../base/useBao'

export interface StakedValue {
	tokenAmount: BigNumber
	wethAmount: BigNumber
	totalWethValue: BigNumber
	tokenPriceInWeth: BigNumber
	poolWeight: BigNumber
}

const useAllStakedValue = (): StakedValue[] => {
	const [balances, setBalance] = useState([] as Array<StakedValue>)
	const { account } = useWeb3React<provider>()
	const bao = useBao()
	const farms = getFarms(bao)
	const masterChefContract = getMasterChefContract(bao)
	const wethContract = getWethContract(bao)
	const { transactions } = useTransactionProvider()

	const fetchAllStakedValue = useCallback(async () => {
		const balances: Array<StakedValue> = await Promise.all(
			farms.map(({ pid, lpContract, tokenAddress, tokenDecimals }) =>
				getTotalLPWethValue(masterChefContract, wethContract, lpContract, getContract(bao, tokenAddress), tokenDecimals, pid),
			),
		)

		setBalance(balances)
	}, [account, masterChefContract, bao])

	useEffect(() => {
		if (account && masterChefContract && bao) {
			fetchAllStakedValue()
		}
	}, [account, transactions, masterChefContract, setBalance, bao])

	return balances
}

export default useAllStakedValue
