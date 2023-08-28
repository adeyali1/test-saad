interface Props {
	pageTitle: string;
	children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
	className?: string;
}

const ConsultantReview = ({ pageTitle, children, className }: Props) => {
	return (
		<div
			onClick={() => {
				console.log("pageTitle", pageTitle);
			}}
			className={`cursor-pointer ${className ?? ""}`}>
			<>{children}</>
		</div>
	);
};

export default ConsultantReview;
