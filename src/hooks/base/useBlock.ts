import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { ethers, providers } from 'ethers'
// import debounce from 'debounce'

const useBlock = () => {
  const [block, setBlock] = useState(0)
  const { library } = useWeb3React()

  useEffect(() => {
    if (!library) return

    const interval = setInterval(async () => {
      const latestBlockNumber = await library.getBlock()
      if (block !== latestBlockNumber) {
        setBlock(latestBlockNumber)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [library])

  return block
}

export default useBlock
