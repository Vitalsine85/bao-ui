import { approvev2 } from 'bao/utils'
import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Contract } from 'ethers'

const useApprovev2 = (tokenContract: Contract, spenderContract: Contract) => {
  const { account } = useWeb3React()

  const handleApprove = useCallback(() => {
    return approvev2(tokenContract, spenderContract, account)
  }, [account, tokenContract, spenderContract])

  return { onApprove: handleApprove }
}

export default useApprovev2
