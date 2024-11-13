export const SectionHeader = ({ title, viewAllLink }) => (
	<div className='flex items-center justify-between mb-4'>
		<h2 className='text-xl font-bold text-white'>{title}</h2>
		{viewAllLink && (
			<a href={viewAllLink} className='text-blue-300 hover:text-blue-100'>
				View All
			</a>
		)}
	</div>
);
