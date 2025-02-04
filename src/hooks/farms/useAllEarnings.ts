import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'

import { getEarned, getFarms, getMasterChefContract } from '@/bao/utils'

import useBao from '../base/useBao'
import useBlock from '../base/useBlock'

const useAllEarnings = () => {
	const [balances, setBalance] = useState([] as Array<BigNumber>)
	const { account } = useWeb3React()
	const bao = useBao()
	const farms = getFarms(bao)
	const masterChefContract = getMasterChefContract(bao)
	const block = useBlock()

	const fetchAllBalances = useCallback(async () => {
		const balances: Array<BigNumber> = await Promise.all(
			farms.map(({ pid }: { pid: number }) => getEarned(masterChefContract, pid, account)),
		)
		setBalance(balances)
	}, [account, masterChefContract, bao])

	useEffect(() => {
		if (account && masterChefContract && bao) {
			fetchAllBalances()
		}
	}, [account, block, masterChefContract, setBalance, bao])

	return balances
}

export default useAllEarnings
