import React from 'react';
import { PageContainer } from '../../components/layout/PageContainer';
import { TrendingBooks } from '../../components/Books/TrendingBooks';

export default function Home() {
	return (
		<PageContainer>
			<h1 className='text-2xl font-bold text-white pt-6'>Welcome home</h1>
			<TrendingBooks />
		</PageContainer>
	);
}
