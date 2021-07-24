import React, { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import useNest from '../../hooks/useNest'
import { getContract } from '../../utils/erc20'
import Redeem from './components/Redeem'
import Issue from './components/Issue'

const Nest: React.FC = () => {
	const { nestId }: any = useParams()
	const { nid, nestToken, nestTokenAddress, inputTokenAddress, name, icon } =
		useNest(nestId)

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	const { ethereum } = useWallet()

	const nestContract = useMemo(() => {
		return getContract(ethereum as provider, nestTokenAddress)
	}, [ethereum, nestTokenAddress])

	const inputTokenContract = useMemo(() => {
		return getContract(ethereum as provider, inputTokenAddress)
	}, [ethereum, inputTokenAddress])

	const outputTokenContract = useMemo(() => {
		return getContract(ethereum as provider, nestTokenAddress)
	}, [ethereum, nestTokenAddress])

	const nestTokenName = useMemo(() => {
		return nestToken.toUpperCase()
	}, [nestToken])

	return (
		<>
			<NestHeader>{name}</NestHeader>
			<StyledFarm>
				<StyledCardsWrapper>
					<StyledCardWrapper>
						<Redeem
							nestContract={nestContract}
							nid={nid}
							nestName={nestToken.toUpperCase()}
						/>
					</StyledCardWrapper>
					<Spacer />
					<StyledCardWrapper>
						<Issue
							nestTokenAddress={nestTokenAddress}
							nestContract={nestContract}
							nestName={nestToken.toUpperCase()}
							inputTokenContract={inputTokenContract}
							inputTokenName={'WETH'}
							outputTokenContract={outputTokenContract}
						/>
					</StyledCardWrapper>
				</StyledCardsWrapper>
				<Spacer size="lg" />
				<StyledInfo>
					⭐️ Every time you stake and unstake LP tokens, the contract will
					automagically harvest BAO rewards for you!
				</StyledInfo>
				<Spacer size="lg" />
			</StyledFarm>
		</>
	)
}

const StyledFarm = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	@media (max-width: 768px) {
		width: 100%;
	}
`

const StyledCardsWrapper = styled.div`
	display: flex;
	width: 600px;
	@media (max-width: 768px) {
		width: 100%;
		flex-flow: column nowrap;
		align-items: center;
	}
`

const StyledCardWrapper = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	@media (max-width: 768px) {
		width: 80%;
	}
`

const StyledInfo = styled.h3`
	color: ${(props) => props.theme.color.grey[400]};
	font-size: 16px;
	font-weight: 400;
	margin: 0;
	padding: 0;
	text-align: center;
`

const NestHeader = styled.h1`
	font-family: 'Kaushan Script', sans-serif;
	color: ${(props) => props.theme.color.red[200]};
	font-size: 48px;
	font-weight: 700;
	margin: 0;
	padding: 0;
	text-align: center;
`

export default Nest
