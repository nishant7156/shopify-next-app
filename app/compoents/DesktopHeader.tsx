'use client';
import { Link } from '@/components/Link';
import { ShopifyHeaderMenu } from '@/lib/shopify/types';

import { useSearchParam, useWindowScroll } from 'react-use';
import Image from 'next/image';
import { Input } from '@/components/Input';
import IconWithText from '@/components/IconWithText';
import {
	ArrowDownIcon,
	EarthIcon,
	Icon,
	IconArrow,
	IconSearch,
} from '@/components';
import CartCount from './CartCount';
import AccountLink from './AccountLink';
import HeaderBottomBanner from './HeaderBottomBanner';
import { SetStateAction, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

function DesktopHeader({
	title,
	isHome,
	menu,
	isUser,
}: {
	isHome: boolean;
	title: string;
	menu: ShopifyHeaderMenu;
	isUser: boolean;
}) {
	const [activeItem, setActiveItem] = useState<any>(null);
	const menuRef = useRef(null);

	const handleClick = (id: string | SetStateAction<null>) => {
		setActiveItem(activeItem === id ? null : id);
	};

	useEffect(() => {
		const handleOutsideClick = (event: { target: any }) => {
			//@ts-ignore
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				setActiveItem(null);
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);
		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, []);

	const searchTerm = useSearchParam('q');
	const { y } = useWindowScroll();

	return (
		<div className="sticky top-0 z-20">
			<div className="bg-white ">
				<div className="container ">
					{/* <header
				role="banner"
				className={clsx(
					'hidden h-nav lg:flex items-center sticky transition duration-300 backdrop-blur-lg z-40 top-0 justify-between w-full leading-none gap-8',
					{
						'bg-primary/80 dark:bg-contrast/60 text-contrast dark:text-primary shadow-darkHeader':
							isHome,
						'bg-contrast/80 text-primary': !isHome,
						'shadow-lightHeader': !isHome && y > 50,
					}
				)}
			>
				<div className="flex gap-12">
					<Link className="font-bold" href="/">
						<Image
							src={'/assets/logo.svg'}
							width={204}
							height={60}
							alt="logo"
						/>
					</Link>
					<nav className="flex gap-8">
						{menu.items.map(item => {
							const pathname = new URL(item.url).pathname;
							return (
								<Link
									key={item.id}
									href={pathname}
									className={({ isActive }) =>
										isActive ? 'pb-1 border-b -mb-px' : 'pb-1'
									}
								>
									{item.title}
								</Link>
							);
						})}
					</nav>
				</div>
				<div className="flex items-center gap-1">
					<form
						method="get"
						action={'/search'}
						className="flex items-center gap-2"
					>
						<Input
							defaultValue={searchTerm}
							className={
								isHome
									? 'focus:border-contrast/20 dark:focus:border-primary/20'
									: 'focus:border-primary/20'
							}
							type="search"
							variant="minisearch"
							placeholder="Search"
							name="q"
						/>
						<button
							type="submit"
							className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
						>
							<IconSearch />
						</button>
					</form>
					<AccountLink
						className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
						isUser={isUser}
					/>
					<CartCount isHome={isHome} />
				</div>
			</header> */}
					<div className=" flex-1">
						<div className="justify-center items-center flex">
							<div className=" bg-primary max-w-[392px] w-full ">
								<p className="py-2 text-center text-[10px] font-bold text-white">
									Free delivery on all spare parts until the end of June 2024
								</p>
							</div>
						</div>
						<div className="flex pt-6 pb-2 justify-between items-center sm-container">
							<Link className="font-bold" href="/">
								<Image
									src={'/assets/logo.svg'}
									width={204}
									height={60}
									alt="logo"
								/>
							</Link>
							<div className=" flex items-center gap-4 ">
								<div className=" flex gap-3 items-center">
									<IconWithText text="English" icon={<EarthIcon />} />

									<IconWithText
										text="Currency  GBP"
										icon={<Icon direction="down" />}
									/>
								</div>
								<form
									method="get"
									action={'/search'}
									className="flex items-center gap-2 bg-[#D9D9D980]"
								>
									<Input
										defaultValue={searchTerm}
										className={
											' border-0 min-w-[310px] w-full placeholder:text-xs placeholder:text-black'
										}
										type="search"
										variant="default"
										placeholder="How can we help you today?"
										name="q"
									/>
									<button
										type="submit"
										className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
									>
										<IconSearch />
									</button>
								</form>
							</div>
						</div>
						<hr />
						<div className="sm-container flex justify-between items-center py-2">
							<nav className="flex gap-8" ref={menuRef}>
								{menu.items.map(item => {
									const pathname = new URL(item.url).pathname;
									const hasSubmenu = item?.items?.length > 0;

									return (
										<div className="relative" key={item.id}>
											<div
												className="flex items-center gap-2 cursor-pointer"
												onClick={() => handleClick(item.id)}
											>
												<button className="focus:outline-none text-base">
													{hasSubmenu ? (
														<p className="pb-1"> {item.title}</p>
													) : (
														<Link
															href={pathname}
															className={clsx('pb-1', 'hover:text-primary')}
														>
															{item.title}
														</Link>
													)}
												</button>
												{hasSubmenu && <ArrowDownIcon />}
											</div>

											{hasSubmenu && activeItem === item.id && (
												<div className="absolute left-0 mt-2 bg-white shadow-lg rounded-md py-2 px-8 z-10">
													<ul className="space-y-2">
														{item.items.map(subItem => (
															<li
																key={subItem.id}
																className={clsx(
																	'w-[150px] font-semibold',
																	'hover:text-primary'
																)}
															>
																<Link href={new URL(subItem.url).pathname}>
																	{subItem.title}
																</Link>
															</li>
														))}
													</ul>
												</div>
											)}
										</div>
									);
								})}
							</nav>
							<div className="flex">
								<AccountLink
									className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
									isUser={isUser}
								/>
								<CartCount isHome={isHome} />
							</div>
						</div>
					</div>
				</div>
			</div>
			<HeaderBottomBanner />
		</div>
	);
}

export default DesktopHeader;
