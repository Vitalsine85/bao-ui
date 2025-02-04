import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'

import { getEarned, getMasterChefContract } from '@/bao/utils'

import useBao from '../base/useBao'
import useBlock from '../base/useBlock'

const useEarnings = (pid: number) => {
	const [balance, setBalance] = useState(new BigNumber(0))
	const { account } = useWeb3React()
	const bao = useBao()
	const masterChefContract = getMasterChefContract(bao)
	const block = useBlock()

	const fetchBalance = useCallback(async () => {
		const balance = await getEarned(masterChefContract, pid, account)
		setBalance(new BigNumber(balance))
	}, [account, masterChefContract, bao])

	useEffect(() => {
		if (account && masterChefContract && bao) {
			fetchBalance()
		}
	}, [account, block, masterChefContract, setBalance, bao])

	return balance
}

export default useEarnings
