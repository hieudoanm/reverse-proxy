import { APP_NAME } from '@next.js/constants/app';
import Link from 'next/link';
import { FC } from 'react';

export const Navbar: FC = () => {
	return (
		<nav>
			<div className="container mx-auto px-4 py-2 md:px-8 md:py-4">
				<div className="flex items-center justify-between">
					<div className="text-xl font-bold">
						<Link href="/">{APP_NAME}</Link>
					</div>
				</div>
			</div>
		</nav>
	);
};
