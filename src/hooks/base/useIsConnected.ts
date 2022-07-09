import { useWeb3React } from '@web3-react/core'
import Config from 'bao/lib/config'
import { useCallback, useEffect, useState } from 'react'
import useBao from './useBao'

const useIsConnected = (): boolean => {
  const bao = useBao()
  const { library, chainId } = useWeb3React()
  const [hasAccounts, setHasAccounts] = useState<boolean | undefined>()

  const fetchIsConnected = useCallback(async () => {
    setHasAccounts((await bao.hasAccounts()) && chainId === Config.networkId)
  }, [bao])

  useEffect(() => {
    if (bao && library) fetchIsConnected()
  }, [bao])

  return hasAccounts
}

export default useIsConnected
