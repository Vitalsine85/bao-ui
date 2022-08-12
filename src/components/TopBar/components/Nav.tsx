import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav: React.FC = () => {
	const navigation = [
		{ name: 'Markets', to: '/' },
		{ name: 'Ballast', to: '/ballast' },
		{ name: 'Baskets', to: '/baskets' },
		{ name: 'Farms', to: '/farms' },
		{ name: 'NFT', to: '/nft' },
	]

	const externalLinks = [
		{ name: 'Vote', href: 'https://snapshot.page/#/baovotes.eth' },
		{ name: 'Forum', href: 'https://gov.bao.finance' },
		{ name: 'Docs', href: 'https://docs.bao.finance' },
	]

	return (
		<nav className='items-center flex'>
			{navigation.map(link => (
				<NavLink
					key={link.name}
					to={{ pathname: link.to }}
					className='transition-all text-rubik text-text-100 hover:text-text-300 active:text-text-400 font-medium pl-3 pr-3 no-underline sm:pr-2 sm:pl-2'
				>
					{link.name}
				</NavLink>
			))}
			{externalLinks.map(link => (
				<a
					key={link.name}
					href={link.href}
					target='_blank'
					rel='noreferrer'
					className='transition-all text-rubik text-text-100 hover:text-text-300 active:text-text-400 font-medium pl-3 pr-3 no-underline sm:pr-2 sm:pl-2'
				>
					{link.name}
				</a>
			))}
		</nav>
	)
}

export default Nav
