import { Hero } from '../components/Hero';
import { ProductSwimlane } from '@/components/ProductSwimlane';
import { FeaturedCollections } from '@/components/FeaturedCollection';
import {
	getFeaturedCollections,
	getFeaturedProducts,
	getHomepageSeo,
	getPageLayoutData,
	getSecondaryHero,
	getTertiaryHero,
} from '@/lib/shopify';
import Head from 'next/head';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Home | This Dot Demo Store',
	robots: 'index, follow',
};

export default async function Homepage() {
	const seoStructuredData = {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: 'Home page',
	};

	const HomePageData = await getPageLayoutData('home');
	const primaryHero = await getHomepageSeo();
	const featuredProducts = await getFeaturedProducts();
	const secondaryHero = await getSecondaryHero();
	const featuredCollections = await getFeaturedCollections();
	const tertiaryHero = await getTertiaryHero();

	console.log(
		HomePageData?.body?.data?.page?.heroTitle?.value,
		'primaryHero'
	);
	// console.log(featuredProducts,"featuredProducts");
	// console.log(secondaryHero,"secondaryHero");
	// console.log(featuredCollections,"featuredCollections");
	// console.log(tertiaryHero,"tertiaryHero");

	return (
		<>
			<Head>
				<script type="application/ld+json">
					{JSON.stringify(seoStructuredData)}
				</script>
			</Head>
			{HomePageData && (
				<Hero
					{...primaryHero.body.data.hero}
					imgSrc={
						HomePageData?.body?.data?.page?.heroImage?.reference?.image
							?.originalSrc
					}
					height="full"
					top
					title={HomePageData?.body?.data?.page?.heroTitle?.value}
				/>
			)}

			{featuredProducts?.body.data.products.nodes && (
				<ProductSwimlane
					products={featuredProducts.body.data.products.nodes}
					title="Featured Products"
					count={4}
				/>
			)}

			{secondaryHero && <Hero {...secondaryHero.body.data.hero} />}

			{featuredCollections?.body.data.collections.nodes && (
				<FeaturedCollections
					collections={featuredCollections.body.data.collections.nodes}
					title="Collections"
				/>
			)}

			{tertiaryHero && <Hero {...tertiaryHero.body.data.hero} />}
		</>
	);
}
