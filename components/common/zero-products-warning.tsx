import Link from "next/link";

interface Props {
	className?: string;
}
const ZeroProductsWarning = ({ className }: Props) => {
	return (
		<div
			className={`flex flex-col gap-10 h-full pr-10 ${className ?? ""
				}`}>
			<p className='text-2xl p-6 text-center bg-gray-50 rounded-md text-gray-500 shadow'>
				<strong> Oops!</strong>	You still did not define your products yet...
			</p>
			<Link
				href='./products'
				className='text-2xl text-center hover:text-black-eerie text-blue-ncs'>
				let us start defining them?
			</Link>
		</div>
	);
};

export default ZeroProductsWarning;
