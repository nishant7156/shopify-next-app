import { Stat1Icon } from '@/components';
import React from 'react';

function HeaderBottomBanner() {
	const arr = [
		'Fast worldwide delivery',
		'24/7 Customer support',
		'Free returns within 30 days',
		'Best prices guaranteed',
	];

	return (
		<div className="bg-gray">
			<div className="sm-container py-4">
				<div className="flex gap-9 items-center overflow-x-auto scrollbar-hide flex-nowrap">
					{arr.map((item, index) => (
						<div key={index} className="flex gap-2 items-center flex-shrink-0">
							<Stat1Icon />
							<p>{item}</p>
							{index < arr.length - 1 && (
								<div className="h-7 w-[1px] ml-6 bg-red-700"></div>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default HeaderBottomBanner;
