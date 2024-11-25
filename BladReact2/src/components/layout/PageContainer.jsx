export const PageContainer = ({ children }) => (
	<div className='bg-bladLightBackground min-h-screen'>
		<div className='flex flex-col items-center'>
			<main className='w-full max-w-screen-lg px-4 pt-16'>{children}</main>
		</div>
	</div>
);
