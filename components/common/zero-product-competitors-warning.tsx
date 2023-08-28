import Link from "next/link";

interface Props {
	className?: string;
}
const ZeroProductCompetitorsWarning = ({ className }: Props) => {
	return (
		<div className={`flex flex-col gap-10 h-full pr-10 ${className ?? ""}`}>
			<p className='text-2xl p-6 text-center bg-gray-50 rounded-md text-gray-500 shadow'>
				<strong> Oops!</strong> You still did not define competitors for
				this product yet...
			</p>
			<Link
				href='./market-potential'
				className='text-2xl text-center hover:text-black-eerie text-blue-ncs'>
				Go define competitors?
			</Link>
		</div>
	);
};

export default ZeroProductCompetitorsWarning;
