import React, { useEffect, useState, useRef } from 'react';

const ScrollableContainer = ({ children, itemWidth }) => {
	const scrollContainerRef = useRef(null);
	const [isHovering, setIsHovering] = useState(false);
	const scrollTimeoutRef = useRef(null);
	const lastScrollTime = useRef(0);
	const accumulatedDelta = useRef(0);

	useEffect(() => {
		const container = scrollContainerRef.current;

		const handleWheel = (e) => {
			if (isHovering) {
				e.preventDefault();

				const now = Date.now();
				const timeDelta = now - lastScrollTime.current;
				lastScrollTime.current = now;

				if (scrollTimeoutRef.current) {
					clearTimeout(scrollTimeoutRef.current);
				}

				accumulatedDelta.current += e.deltaY;

				const baseScrollAmount = 1.5;
				let scrollMultiplier;

				if (timeDelta < 50) {
					scrollMultiplier = 0.5;
				} else if (timeDelta < 100) {
					scrollMultiplier = 0.75;
				} else {
					scrollMultiplier = 1;
				}

				const scrollAmount = e.deltaY * baseScrollAmount * scrollMultiplier;

				container.scrollBy({
					left: scrollAmount,
					behavior: timeDelta < 50 ? 'auto' : 'smooth',
				});

				scrollTimeoutRef.current = setTimeout(() => {
					accumulatedDelta.current = 0;
				}, 150);
			}
		};

		if (container) {
			container.addEventListener('wheel', handleWheel, { passive: false });
			return () => {
				container.removeEventListener('wheel', handleWheel);
			};
		}
	}, [isHovering]);

	const handleScroll = (direction) => {
		const container = scrollContainerRef.current;
		if (!container) return;

		const visibleItems = Math.floor(container.clientWidth / itemWidth);
		const scrollAmount = itemWidth * visibleItems;

		container.scrollBy({
			left: direction === 'left' ? -scrollAmount : scrollAmount,
			behavior: 'smooth',
		});
	};

	const ScrollButton = ({ direction, onClick }) => (
		<button
			onClick={onClick}
			className={`absolute top-1/2 transform -translate-y-1/2 z-20 bg-gray-700 hover:bg-gray-600 text-white p-2 ${
				direction === 'left' ? 'left-0 rounded-r-lg' : 'right-0 rounded-l-lg'
			}`}
		>
			{direction === 'left' ? '←' : '→'}
		</button>
	);

	return (
		<div
			className='relative'
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
		>
			<ScrollButton direction='left' onClick={() => handleScroll('left')} />

			<div
				className='overflow-x-auto scrollbar-hide'
				ref={scrollContainerRef}
				style={{
					scrollbarWidth: 'none',
					msOverflowStyle: 'none',
					WebkitOverflowScrolling: 'touch',
				}}
			>
				<div className='flex'>{children}</div>
			</div>

			<ScrollButton direction='right' onClick={() => handleScroll('right')} />
		</div>
	);
};

export default ScrollableContainer;
