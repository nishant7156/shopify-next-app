import React from 'react';
import { Icon, IconSelect } from './Icon';

function IconWithText({ icon, text }: any) {
	return (
		<div className=" flex items-center gap-2">
			{icon}
			<p className='text-xs'>{text}</p>
		</div>
	);
}

export default IconWithText;
