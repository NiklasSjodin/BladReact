export const PageContainer = ({ children }) => (
	<div className='bg-gradient-to-br from-gray-500 to-black min-h-screen'>
		<div className='flex flex-col items-center'>
			<main className='w-full max-w-screen-lg px-4'>{children}</main>
		</div>
	</div>
);
