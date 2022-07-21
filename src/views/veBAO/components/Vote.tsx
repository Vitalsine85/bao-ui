import React from 'react'
import { Button, Col, Form, InputGroup, Nav, Row, Tab } from 'react-bootstrap'

const Vote: React.FC = () => {
	return (
		<Tab.Container defaultActiveKey="active">
			<Row>
				<Col sm={2}>
					<Nav variant="pills" className="flex-column">
						<Nav.Item>
							<Nav.Link eventKey="active" href="#">
								Active
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey="all" href="#">
								All
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey="new-proposal" href="#">
								New Proposal
							</Nav.Link>
						</Nav.Item>
					</Nav>
				</Col>
				<Col sm={10}>
					<Tab.Content>
						<Tab.Pane eventKey="active">Active Proposals</Tab.Pane>
						<Tab.Pane eventKey="all">All Proposals</Tab.Pane>
						<Tab.Pane eventKey="new-proposal">
							<Form>
								<Form.Group className="mb-3" controlId="proposalTitle">
									<Form.Label>Proposal by</Form.Label>
									<Form.Control
										type="text"
										placeholder="vitalsine.eth"
										disabled
										readOnly
									/>
								</Form.Group>
								<Form.Group className="mb-3" controlId="proposalTitle">
									<Form.Label>Title of Proposal</Form.Label>
									<Form.Control
										type="title"
										placeholder="Enter title"
										required
									/>
								</Form.Group>
								<Form.Group className="mb-3" controlId="votingPeriod">
									<Form.Label>Voting Period</Form.Label>
									<InputGroup className="mb-3">
										<Form.Control
											type="voting-period"
											placeholder="3"
											required
										/>
										<InputGroup.Text>Days</InputGroup.Text>
									</InputGroup>
								</Form.Group>
								<Form.Group className="mb-3" controlId="proposalDescription">
									<Form.Label>Proposal Description</Form.Label>
									<Form.Control
										as="textarea"
										placeholder="Enter description"
										required
									/>
								</Form.Group>
								<Row>
									<Form.Group
										as={Col}
										className="mb-3"
										controlId="proposalTitle"
									>
										<Form.Label>Proposal Discussion</Form.Label>
										<Form.Control
											type="title"
											placeholder="Enter link to discussion"
											required
										/>
									</Form.Group>
									<Form.Group
										as={Col}
										className="mb-3"
										controlId="proposalTitle"
									>
										<Form.Label>Additional Documentation</Form.Label>
										<Form.Control
											type="title"
											placeholder="Enter link to documentation"
											required
										/>
									</Form.Group>
								</Row>
								<Button variant="primary" type="submit">
									Submit
								</Button>
							</Form>
						</Tab.Pane>
					</Tab.Content>
				</Col>
			</Row>
		</Tab.Container>
	)
}

export default Vote
