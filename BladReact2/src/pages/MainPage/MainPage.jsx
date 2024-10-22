import { Button } from '@/components/ui/button';
import { MBButton } from '@/components/ui/moving-border';
import { TextRevealCard,TextRevealCardTitle,TextRevealCardDescription } from '@/components/ui/text-reveal-card';

export default function MainPage() {

  return (
		<>
		<Button>Button</Button>
			<Button variant='pill'>Button</Button>
			<MBButton>Moving Border Button</MBButton>
			<div className='flex items-center justify-center bg-[#0E0E10] h-[40rem] rounded-2xl w-full'>
				<TextRevealCard
					text='You know the business'
					revealText='I know the chemistry '
				>
					<TextRevealCardTitle>
						Sometimes, you just need to see it.
					</TextRevealCardTitle>
					<TextRevealCardDescription>
						This is a text reveal card. Hover over the card to reveal the hidden
						text.
					</TextRevealCardDescription>
				</TextRevealCard>
			</div>
		</>
	);
}