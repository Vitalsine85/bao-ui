import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import Spacer from 'components/Spacer'
import React from 'react'
import { Col, Container, Nav, Row, Tab } from 'react-bootstrap'
import { StyledInfo } from 'views/NFT/components/styles'
import Gauges from './components/Gauges'
import Lock from './components/Lock'
import Vote from './components/Vote'

const veBAO: React.FC = () => {
	return (
		<Page>
			<PageHeader icon="" title="veBAO" subtitle="Lock your BAO for veBAO!" />
			<Container>
				<StyledInfo>
					<div
						style={{
							alignItems: 'center',
							display: 'flex',
							flex: 1,
							justifyContent: 'center',
						}}
					>
						Lock your BAO for veBAO!
					</div>
				</StyledInfo>
				<Spacer size="md" />
				<Tab.Container defaultActiveKey="lock">
					<Row>
						<Col>
							<Nav
								variant="pills"
								className="justify-content-center"
								activeKey="lock"
							>
								<Nav.Item>
									<Nav.Link eventKey="lock" href="#">
										Lock
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey="vote" href="#">
										Vote
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey="gauges" href="#">
										Gauges
									</Nav.Link>
								</Nav.Item>
							</Nav>
						</Col>
					</Row>
					<Row>
						<Col>
							<Tab.Content>
								<Tab.Pane eventKey="lock">
									<Lock />
								</Tab.Pane>
								<Tab.Pane eventKey="vote">
									<Vote />
								</Tab.Pane>
								<Tab.Pane eventKey="gauges">
									<Gauges />
								</Tab.Pane>
							</Tab.Content>
						</Col>
					</Row>
				</Tab.Container>
			</Container>
		</Page>
	)
}

export default veBAO
