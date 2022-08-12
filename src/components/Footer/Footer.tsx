import React from 'react'
import styled from 'styled-components'
import Nav from './components/Nav'

const Footer: React.FC = () => (
	<footer className='mt-4 m-auto p-4'>
		<div className='m-auto items-center flex h-18 justify-between m-w-7xl max-w -mb-3'>
			<div className='flex flex-1 justify-center'>
				<Nav />
			</div>
		</div>
	</footer>
)

export default Footer
