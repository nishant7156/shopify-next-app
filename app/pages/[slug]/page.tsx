import { getPageLayoutData } from '@/lib/shopify';
import React from 'react';

async function Page({ params }: any) {
	const { slug } = params;
	console.log(params);

	const pageData = await getPageLayoutData(slug);
	console.log(pageData?.body?.data, 'pageData');

	const statsContent = pageData?.body?.data?.page.stats?.value;

	return (
		<div>
			<h1>{pageData?.body?.data?.page.title}</h1>

			{statsContent ? (
				<div
					className=""
					dangerouslySetInnerHTML={{ __html: statsContent }}
				></div>
			) : (
				<p>No stats available.</p>
			)}
		</div>
	);
}

export default Page;
