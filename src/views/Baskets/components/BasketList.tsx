import React from 'react'
import useComposition from '../../../hooks/baskets/useComposition'
import useBasketRates from '../../../hooks/baskets/useNestRate'
import { Col, Row } from 'react-bootstrap'
import { ListHeader, ListItem, ListItemHeader } from '../../../components/List'
import { IconContainer, StyledIcon } from 'components/Icon'
import { SpinnerLoader } from '../../../components/Loader'
import { ActiveSupportedBasket } from '../../../bao/lib/types'
import Tooltipped from '../../../components/Tooltipped'
import { getDisplayBalance } from '../../../utils/numberFormat'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

const BasketList: React.FC<BasketListProps> = ({ baskets }) => {
	return (
		<>
			<ListHeader
				headers={['Basket Name', 'Underlying Assets', 'Cost to Mint']}
			/>
			{baskets && baskets.map((basket) => <BasketListItem basket={basket} />)}
		</>
	)
}

const BasketListItem: React.FC<BasketListItemProps> = ({ basket }) => {
	const composition = useComposition(basket)
	const rates = useBasketRates(basket)

	const history = useHistory()
	const handleClick = () => history.push(`/baskets/${basket.nid}`)

	return (
		<ListItem onClick={handleClick}>
			<ListItemHeader>
				<Row lg={3} style={{ width: '100%' }}>
					<Col>
						<IconContainer>
							<StyledIcon src={basket.icon} alt={basket.symbol} />
							<span style={{ display: 'inline-block', verticalAlign: 'middle' }}>
								<p style={{ margin: '0', lineHeight: '1rem' }}>
									{basket.symbol}
								</p>
								<SubText>{basket.desc}</SubText>
							</span>
						</IconContainer>
					</Col>
					<Col>
						{composition ? (
							composition.map((component: any) => {
								return (
									<Tooltipped content={component.symbol} key={component.symbol}>
										<StyledIcon src={component.image} />
									</Tooltipped>
								)
							})
						) : (
							<SpinnerLoader />
						)}
					</Col>
					<Col>${rates ? getDisplayBalance(rates.usd) : <SpinnerLoader />}</Col>
				</Row>
			</ListItemHeader>
		</ListItem>
	)
}

type BasketListProps = {
	baskets: ActiveSupportedBasket[]
}

type BasketListItemProps = {
	basket: ActiveSupportedBasket
}

export default BasketList

const SubText = styled.p`
	color: ${(props) => props.theme.color.text[200]};
	font-size: 0.875rem;
	margin: 0;
	line-height: 1rem;
`
