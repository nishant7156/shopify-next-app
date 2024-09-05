import clsx from 'clsx';
import { Link } from './Link';
import { Heading, Text } from './Text';
import { Image as ImageType, Metafield } from '@/lib/shopify/types';
import Image from 'next/image';

export interface CollectionHero {
	byline: Metafield;
	cta: Metafield;
	handle: string;
	heading: Metafield;
	height?: 'full';
	spread: any;
	spreadSecondary: any;
	top?: boolean;
	title?: string;
	imgSrc?: any;
}

/**
 * Hero component that renders metafields attached to collection resources
 **/
export function Hero({
	byline,
	cta,
	handle,
	heading,
	height,
	spread,
	spreadSecondary,
	top,
	title,
	imgSrc,
}: CollectionHero) {
	return (
		<Link href={`/collections/${handle}`}>
			<section
				className={clsx(
					'relative justify-center items-start flex flex-col w-full',
					top && '-mt-nav',
					height === 'full'
						? 'h-screen'
						: 'aspect-[4/5] sm:aspect-square md:aspect-[5/4] lg:aspect-[3/2] xl:aspect-[2/1]'
				)}
			>
				<div className="absolute inset-0 grid flex-grow grid-flow-col pointer-events-none auto-cols-fr -z-10 content-stretch overflow-clip">
					{imgSrc && (
						<div>
							{/* <SpreadMedia
								sizes={
									spreadSecondary?.reference
										? '(min-width: 48em) 50vw, 100vw'
										: '100vw'
								}
								data={spread.reference.image}
							/> */}
							<Image
								src={imgSrc}
								alt={'d'}
								className="block object-cover w-full h-full"
								sizes={'(min-width: 48em) 50vw, 100vw'}
								width={100}
								height={100}
							/>
						</div>
					)}
					{spreadSecondary?.reference && (
						<div className="hidden md:block">
							<SpreadMedia
								sizes="50vw"
								data={spreadSecondary.reference.image}
							/>
						</div>
					)}
				</div>
				<div className=" container">
					<div className=" flex flex-col ">
						{title && (
							<Heading
								format
								as="h2"
								size="display"
								className="max-w-md text-white"
							>
								{title || heading.value}
							</Heading>
						)}
					</div>
				</div>
				{/* <div className="flex flex-col items-baseline justify-between gap-4 px-6 py-8 sm:px-8 md:px-12 bg-gradient-to-t dark:from-contrast/60 dark:text-primary from-primary/60 text-contrast"></div> */}
			</section>
		</Link>
	);
}

function SpreadMedia({ data, sizes }: { data: ImageType; sizes: string }) {
	return (
		<Image
			src={data.url}
			alt={data.altText}
			className="block object-cover w-full h-full"
			sizes={sizes}
			width={100}
			height={100}
		/>
	);
}
