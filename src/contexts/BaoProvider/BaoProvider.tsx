import { useWeb3React } from '@web3-react/core'
import { Bao } from 'bao'
import Config from 'bao/lib/config'
import React, {
	createContext,
	PropsWithChildren,
	useEffect,
	useState,
} from 'react'

export interface BaoContext {
	bao?: typeof Bao
}

export const Context = createContext<BaoContext>({
	bao: undefined,
})

declare global {
	interface Window {
		baosauce: any
		bao: any
		ethereum?: any
	}
}

interface BaoProviderProps {
	children: any
}

const BaoProvider: React.FC<PropsWithChildren<BaoProviderProps>> = ({
	children,
}) => {
	const wallet = useWeb3React()
	const { library }: any = wallet
	const [bao, setBao] = useState<any>()

	window.bao = bao

	useEffect(() => {
		const baoLib = new Bao(library, Config.networkId, {
			defaultConfirmations: 1,
			autoGasMultiplier: 1.05,
			defaultGas: '300000',
			defaultGasPrice: '20000000000',
			ethereumNodeTimeout: 10000,
		})
		setBao(baoLib)
		window.baosauce = baoLib
	}, [library])

	return <Context.Provider value={{ bao }}>{children}</Context.Provider>
}

export default BaoProvider
