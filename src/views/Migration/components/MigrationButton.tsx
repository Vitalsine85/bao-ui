import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useWeb3React } from '@web3-react/core'
import Config from 'bao/lib/config'
import { approvev2 } from 'bao/utils'
import BigNumber from 'bignumber.js'
import { SubmitButton } from 'components/Button/Button'
import { SpinnerLoader } from 'components/Loader'
import useAllowancev2 from 'hooks/base/useAllowancev2'
import useBao from 'hooks/base/useBao'
import useTransactionHandler from 'hooks/base/useTransactionHandler'
import React, { useMemo } from 'react'
import { exponentiate } from 'utils/numberFormat'

const MigrationButton: React.FC<MigrationButtonProps> = ({
	inputVal,
	maxValue,
}: MigrationButtonProps) => {
	const bao = useBao()
	const { account } = useWeb3React()
	const { pendingTx, handleTx } = useTransactionHandler()

	const inputApproval = useAllowancev2(
		Config.addressMap.BAO,
		Config.contracts.stabilizer[Config.networkId].address,
	)

	const handleClick = async () => {
		if (!bao) return

		const SwapperContract = bao.getContract('stabilizer')
		// BAOv1->BAOv2
		if (!inputApproval.gt(0)) {
			const tokenContract = bao.getNewContract(
				'erc20.json',
				Config.addressMap.BAO,
			)
			return handleTx(
				approvev2(tokenContract, SwapperContract, account),
				'Migration: Approve BAOv1',
			)
		}

		handleTx(
			SwapperContract.methods
				.sell(exponentiate(inputVal).toString())
				.send({ from: account }),
			'Migration: Swap BAOv1 to BAOv2',
		)
	}

	const buttonText = () => {
		if (!inputApproval) return <SpinnerLoader />

		if (pendingTx) {
			return typeof pendingTx === 'string' ? (
				<a
					href={`${Config.defaultRpc.blockExplorerUrls}/tx/${pendingTx}`}
					target="_blank"
					rel="noreferrer"
				>
					Pending Transaction <FontAwesomeIcon icon="external-link-alt" />
				</a>
			) : (
				'Pending Transaction'
			)
		} else {
			return inputApproval.gt(0) ? 'Swap BAOv1 for BAOv2' : 'Approve BAOv1'
		}
	}

	const isDisabled = useMemo(
		() =>
			typeof pendingTx === 'string' ||
			pendingTx ||
			new BigNumber(inputVal).isNaN() ||
			new BigNumber(inputVal).gt(maxValue),
		[pendingTx, inputVal],
	)

	return (
		<SubmitButton onClick={handleClick} disabled={isDisabled}>
			{buttonText()}
		</SubmitButton>
	)
}

type MigrationButtonProps = {
	inputVal: string
	maxValue: BigNumber
}

export default MigrationButton
