import React from 'react'
import { PropsWithChildren } from 'react'
import styled from 'styled-components'
import Footer from '../Footer'

interface PageProps {
	children: any
}

const Page: React.FC<PropsWithChildren<PageProps>> = ({ children }) => (
	<div className='table max-w-7xl mx-auto sm:px-6 lg:px-8 h-[calc(100vh-7px)] top-18 absolute'>
		<div className='table-cell align-middle min-h-[calc(100vh-72px)] bg-cover bg-no-repeat top-0 left-0'>
			<div className='items-center flex flex-col m-h-[calc(100vh-240px)'>{children}</div>
			<Footer />
		</div>
	</div>
)

export default Page
