import Page from "components/Page"
import PageHeader from "components/PageHeader"
import Spacer from "components/Spacer"
import { Container } from "react-bootstrap"
import { StyledInfo } from "views/NFT/components/styles"

const Migration: React.FC = () => {

	return (
		<Page>
			<PageHeader
				icon=""
				title="Migration"
				subtitle="Migrate your BAOv1 to BAOv2!"
			/>
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
						Migrate your BAOv1 to BAOv2!
					</div>
				</StyledInfo>
				<Spacer size="md" />
			</Container>
		</Page>
	)
}

export default Migration
