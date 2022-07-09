import { ActiveSupportedBasket } from '../../bao/lib/types'
import { useCallback, useEffect, useState } from 'react'
import { BigNumber } from 'bignumber.js'
import useBao from '../base/useBao'
import { getWethPriceLink } from '../../bao/utils'
import { useWeb3React } from '@web3-react/core'
import UNILPABI from 'bao/lib/abi/uni_v2_lp.json'

const usePairPrice = (basket: ActiveSupportedBasket) => {
  const [price, setPrice] = useState<BigNumber | undefined>()
  const bao = useBao()
  const { library, account } = useWeb3React()

  const fetchPairPrice = useCallback(async () => {
    const lpContract = bao.getNewContract(
      basket.lpAddress,
      UNILPABI,
      library,
      account,
    )

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
