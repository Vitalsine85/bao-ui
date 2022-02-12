import Config from 'bao/lib/config'
import { getBaoSupply } from 'bao/utils'
import BigNumber from 'bignumber.js'
import ExternalLink from 'components/ExternalLink'
import { SpinnerLoader } from 'components/Loader'
import Spacer from 'components/Spacer'
import useBao from 'hooks/base/useBao'
import useTokenBalance from 'hooks/base/useTokenBalance'
import useAllEarnings from 'hooks/farms/useAllEarnings'
import useAllStakedValue from 'hooks/farms/useAllStakedValue'
import useFarms from 'hooks/farms/useFarms'
import useLockedEarnings from 'hooks/farms/useLockedEarnings'
import React, { Fragment, useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import CountUp from 'react-countup'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import GraphUtil from 'utils/graph'
import { getBalanceNumber, getDisplayBalance } from 'utils/numberFormat'
import { Footnote, FootnoteValue, StyledInfo } from './styles'

const PendingRewards: React.FC = () => {
	const [start, setStart] = useState(0)
	const [end, setEnd] = useState(0)
	const [scale, setScale] = useState(1)

	const allEarnings = useAllEarnings()
	let sumEarning = 0
	for (const earning of allEarnings) {
		sumEarning += new BigNumber(earning)
			.div(new BigNumber(10).pow(18))
			.toNumber()
	}

	const [farms] = useFarms()
	const allStakedValue = useAllStakedValue()

	if (allStakedValue && allStakedValue.length) {
		const sumWeth = farms.reduce(
			(c, { id }, i) => c + (allStakedValue[i].totalWethValue.toNumber() || 0),
			0,
		)
	}

	useEffect(() => {
		setStart(end)
		setEnd(sumEarning)
	}, [sumEarning])

	return (
		<span>
			<CountUp
				start={start}
				end={end}
				decimals={end < 0 ? 4 : end > 1e5 ? 0 : 2}
				duration={1}
				onStart={() => {
					setScale(1.25)
					setTimeout(() => setScale(1), 600)
				}}
				separator=","
			/>
		</span>
	)
}

const Balances: React.FC = () => {
	const [totalSupply, setTotalSupply] = useState<BigNumber>()
	const bao = useBao()
	const baoBalance = useTokenBalance(
		bao && bao.getContract('bao').options.address,
	)
	const { account, ethereum }: { account: any; ethereum: any } = useWallet()
	const [baoPrice, setBaoPrice] = useState<BigNumber | undefined>()
	const locks = useLockedEarnings()

	useEffect(() => {
		async function fetchTotalSupply() {
			const supply = await getBaoSupply(bao)
			setTotalSupply(supply)
		}
		if (bao) {
			fetchTotalSupply()
		}
	}, [bao, setTotalSupply])

	useEffect(() => {
		if (!bao) return
		GraphUtil.getPrice(Config.addressMap.WETH).then(async (wethPrice) => {
			const baoPrice = await GraphUtil.getPriceFromPair(
				wethPrice,
				Config.contracts.bao[Config.networkId].address,
			)
			setBaoPrice(baoPrice)
		})
	}, [bao, setBaoPrice])

	return (
		<Fragment>
			<Container>
				<Row style={{ display: 'flex', flexWrap: 'wrap' }}>
					<Col style={{ display: 'flex', flexDirection: 'column' }}>
						<Card>
							<Card.Body>
								<StyledInfo>
									❗️{' '}
									<span
										style={{
											fontWeight: 700,
											color: '${(props) => props.theme.color.red}',
										}}
									>
										Attention:
									</span>{' '}
									Be sure to read the{' '}
									<ExternalLink
										href="https://docs.bao.finance/franchises/bao"
										target="_blank"
									>
										docs
									</ExternalLink>{' '}
									before using the farms so you are familiar with protocol risks
									and fees!
								</StyledInfo>
								<Spacer size="md" />
								<StyledInfo>
									❓{' '}
									<span
										style={{
											fontWeight: 700,
											color: '${(props) => props.theme.color.red}',
										}}
									>
										Don't see your farm?
									</span>{' '}
									Visit{' '}
									<ExternalLink href="https://old.bao.finance" target="_blank">
										old.bao.finance
									</ExternalLink>{' '}
									to withdraw your LP from our archived farms.
								</StyledInfo>
							</Card.Body>
						</Card>
					</Col>
					<Col style={{ display: 'flex', flexDirection: 'column' }}>
						<Card>
							<Card.Body>
								<Footnote>
									Your BAO Balance
									<FootnoteValue>
										{account ? getDisplayBalance(baoBalance) : 'Locked'}{' '}
									</FootnoteValue>
								</Footnote>
								<Footnote>
									Your Locked BAO
									<FootnoteValue>{getDisplayBalance(locks)}</FootnoteValue>
								</Footnote>
								<Footnote>
									Pending harvest
									<FootnoteValue>
										<PendingRewards />
									</FootnoteValue>
								</Footnote>
								<Footnote>
									Total BAO Supply
									<FootnoteValue>
										{totalSupply ? getDisplayBalance(totalSupply) : 'Locked'}
									</FootnoteValue>
								</Footnote>
								<Footnote>
									BAO Price
									<FootnoteValue>
										{baoPrice ? (
											`$${getDisplayBalance(baoPrice, 0)}`
										) : (
											<SpinnerLoader />
										)}
									</FootnoteValue>
								</Footnote>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</Fragment>
	)
}

export default Balances

const BaoPrice = styled.div`
	margin: 0 auto;
	text-align: center;
`
