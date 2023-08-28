import { NextPage } from "next";
import React from "react";

interface Props {
	className: string;
	message: string;
}

const Spinner: NextPage<Props> = (
	props = {
		className: "",
		message: "",
	}
) => {
	return (
		<div className={`flex ${props.className}`}>
			<svg
				className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
				xmlns='http://www.w3.org/2000/svg'
				fill='#ccc'
				viewBox='0 0 24 24'>
				<circle
					className='opacity-25'
					cx='12'
					cy='12'
					r='10'
					stroke='currentColor'
					strokeWidth='5'></circle>
				<path
					className='opacity-75'
					fill='#222'
					d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
			</svg>
			{props.message}
		</div>
	);
};

export default Spinner;
