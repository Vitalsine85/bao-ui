import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import baoIcon from 'assets/img/logo.svg'
import Config from 'bao/lib/config'
import { StatBadge } from 'components/Badge'
import { IconFlex } from 'components/Icon'
import { BalanceInput } from 'components/Input'
import Spacer from 'components/Spacer'
import { StatCard, StatsRow } from 'components/Stats'
import { addYears } from 'date-fns'
import useTokenBalance from 'hooks/base/useTokenBalance'
import React, { useState } from 'react'
import { Card, Col, InputGroup, Row } from 'react-bootstrap'
import DatePicker from 'react-date-picker'
import styled from 'styled-components'
import { decimate } from 'utils/numberFormat'
import { AssetStack } from 'views/Markets/components/styles'

const Lock: React.FC = () => {
	const [inputVal, setInputVal] = useState('')
	const [endDate, setEndDate] = useState(new Date())
	const baoBalance = useTokenBalance(Config.addressMap.BAO)

	return (
		<>
			<StatsRow>
				<Col>
					<StatCard>
						<span>BAO Balance</span>
						<Spacer size={'sm'} />
						<StatBadge bg="secondary">
							<img src={baoIcon} alt="BAO" width="24px" /> 10,000,000
						</StatBadge>
					</StatCard>
				</Col>
				<Col>
					<StatCard>
						<span>Locked (until 7/21/2024)</span>
						<Spacer size={'sm'} />
						<StatBadge bg="secondary">
							100,000 <img src={baoIcon} alt="BAO" width="24px" /> = 100,000
							veBAO
						</StatBadge>
					</StatCard>
				</Col>
				<Col>
					<StatCard>
						<span>Total Locked</span>
						<Spacer size={'sm'} />
						<StatBadge bg="secondary">
							600,000,000 <img src={baoIcon} alt="BAO" width="24px" /> = 60% =
							$6,000,000
						</StatBadge>
					</StatCard>
				</Col>
			</StatsRow>
			<Card>
				<Card.Header>Lock BAO for veBAO</Card.Header>
				<Card.Body>
					<Card.Text>
						Lock your BAO for veBAO to participate in protocol governance, earn
						a share of protocol revenue, and boost your yields from providing
						liquidity. Your veBAO balance is determined by how much BAO you lock
						and for how long.
					</Card.Text>
					<Row>
						<Col>
							<BalanceInput
								onMaxClick={() => setInputVal(decimate(baoBalance).toString())}
								onChange={(e: {
									currentTarget: { value: React.SetStateAction<string> }
								}) => setInputVal(e.currentTarget.value)}
								value={inputVal}
								label={
									<AssetStack>
										<IconFlex>
											<img src={baoIcon} />
										</IconFlex>
									</AssetStack>
								}
							/>
						</Col>
						<Col>
							<InputGroup>
								<InputGroup.Text>
									<FontAwesomeIcon icon="calendar" />
								</InputGroup.Text>
								<LockDatePicker
									onChange={(date: Date) => setEndDate(date)}
									minDate={new Date()}
									maxDate={addYears(new Date(), 4)}
									format="MM-dd-y"
									value={endDate}
									calendarIcon={null}
									clearIcon={null}
									showLeadingZeros={false}
								/>
							</InputGroup>
						</Col>
					</Row>
				</Card.Body>
			</Card>
		</>
	)
}

export default Lock

const LockDatePicker = styled(DatePicker)`
	height: 50px;
	width: auto;
	border-top-right-radius: 8px;
	border-bottom-right-radius: 8px;
	background: ${(props) => props.theme.color.primary[300]};
	border: none;
	color: ${(props) => props.theme.color.text[100]};
	outline: none;
	padding-left: 1rem;
`
