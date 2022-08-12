import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import baoIcon from 'assets/img/tokens/BAO.png'
import Config from 'bao/lib/config'
import BigNumber from 'bignumber.js'
import { IconFlex } from 'components/Icon'
import { BalanceInput } from 'components/Input'
import useTokenBalance from 'hooks/base/useTokenBalance'
import React, { useState } from 'react'
import { Badge, Card } from 'react-bootstrap'
import styled from 'styled-components'
import { decimate, getDisplayBalance } from 'utils/numberFormat'
import { AssetStack } from 'views/Markets/components/styles'
import MigrationButton from './MigrationButton'

const MigrationSwapper: React.FC = () => {
	const [inputVal, setInputVal] = useState('')

	const baov1Balance = useTokenBalance(Config.addressMap.BAO)

	return (
		<BallastSwapCard>
			<BallastLabel>
				<FontAwesomeIcon icon='long-arrow-alt-right' /> Balance: {getDisplayBalance(baov1Balance).toString()} BAOv1
			</BallastLabel>
			<BalanceInput
				onMaxClick={() => setInputVal(decimate(baov1Balance).toString())}
				onChange={(e: { currentTarget: { value: React.SetStateAction<string> } }) => setInputVal(e.currentTarget.value)}
				value={inputVal}
				label={
					<AssetStack>
						<IconFlex>
							<img src={baoIcon} />
						</IconFlex>
					</AssetStack>
				}
			/>
			<SwapDirection>
				<SwapDirectionBadge pill>
					<FontAwesomeIcon icon='sync' />
				</SwapDirectionBadge>
			</SwapDirection>
			<BalanceInput
				onMaxClick={null}
				onChange={(e: { currentTarget: { value: React.SetStateAction<string> } }) => setInputVal(e.currentTarget.value)}
				disabled={true}
				value={inputVal && new BigNumber(inputVal).times(0.001).toString()}
				label={
					<AssetStack>
						<IconFlex>
							<img src={baoIcon} />
						</IconFlex>
					</AssetStack>
				}
			/>{' '}
			<br />
			<MigrationButton inputVal={inputVal} maxValue={decimate(baov1Balance)} />
		</BallastSwapCard>
	)
}

const BallastSwapCard = styled(Card)`
	width: 720px;
	padding: 25px;
	margin: auto;
	background-color: ${props => props.theme.color.primary[100]};
	border-radius: ${props => props.theme.borderRadius}px;
	border: ${props => props.theme.border.default};

	label > span {
		float: right;
		margin-bottom: 0.25rem;
		color: ${props => props.theme.color.text[200]};
	}

	@media (max-width: ${props => props.theme.breakpoints.md}px) {
		width: 100%;
	}
`

const SwapDirection = styled.a`
	text-align: center;
	display: block;
	margin-top: 1em;
	color: ${props => props.theme.color.text[200]};
	user-select: none;
	transition: 200ms;

	&:hover {
		cursor: pointer;
	}
`

const SwapDirectionBadge = styled(Badge)`
	background-color: ${props => props.theme.color.primary[300]} !important;
	color: ${props => props.theme.color.text[100]};
	border: none;
	margin-bottom: 0.5rem;

	@media (max-width: ${props => props.theme.breakpoints.md}px) {
		font-size: 0.875rem !important;
	}
`

const BallastLabel = styled.label`
	font-size: 1rem;

	@media (max-width: ${props => props.theme.breakpoints.md}px) {
		font-size: 0.875rem !important;
	}

	@media (max-width: ${props => props.theme.breakpoints.sm}px) {
		font-size: 0.75rem !important;
	}
`

export default MigrationSwapper
