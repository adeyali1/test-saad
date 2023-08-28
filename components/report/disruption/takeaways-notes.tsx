import { ITakeaway } from "../../../models/types";

interface Props {
	title: string;
	takeaways?: ITakeaway;
}

const ReportTakeawaysNotes = ({ title, takeaways }: Props) => {
	return (
		<>
			<div className='grow flex flex-col gap-3'>
				<label className='text-dark-400 report-header-3'>{title}</label>
				<ul className='flex flex-col gap-3'>
					{!takeaways?.notes.length && (
						<div className='w-full flex justify-start items-center'>
							<p className='p-3 text-yellow-700 text-xl text-center'>
								No notes are added yet
							</p>
						</div>
					)}
					{takeaways?.notes.map((note, index) => (
						<li
							key={index}
							className='relative flex items-center p-3 odd:bg-slate-50'>
							{note}
						</li>
					))}
				</ul>
			</div>
		</>
	);
};

export default ReportTakeawaysNotes;
