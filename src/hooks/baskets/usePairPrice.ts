import { BigNumber } from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'

import { ActiveSupportedBasket } from '../../bao/lib/types'
import { getWethPriceLink } from '../../bao/utils'
import useBao from '../base/useBao'

const usePairPrice = (basket: ActiveSupportedBasket) => {
	const [price, setPrice] = useState<BigNumber | undefined>()
	const bao = useBao()

	const fetchPairPrice = useCallback(async () => {
		const lpContract = bao.getNewContract('uni_v2_lp.json', basket.lpAddress)

		const wethPrice = await getWethPriceLink(bao)
		const reserves = await lpContract.methods.getReserves().call()

		// This won't always work. Should check which side of the LP the basket token is on.
		setPrice(wethPrice.times(new BigNumber(reserves[1]).div(reserves[0])))
	}, [basket, bao])

	useEffect(() => {
		if (!(basket && bao)) return

		fetchPairPrice()
	}, [basket, bao])

	return price
}

export default usePairPrice
