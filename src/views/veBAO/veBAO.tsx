import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import Spacer from 'components/Spacer'
import React from 'react'
import { Container } from 'react-bootstrap'
import { StyledInfo } from 'views/NFT/components/styles'

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
			</Container>
		</Page>
	)
}

export default veBAO
