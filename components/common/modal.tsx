import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IModal } from "../../models/types";

interface Props {
	children: any;
	config: IModal;
}

const Modal = ({ children, config = {} as IModal }: Props) => {
	const { className, isShown, closeCallback } = config;

	if (!isShown) return <></>;

	return (
		<div className='z-[99999] fixed inset-0 flex justify-center items-center bg-neutral-900 bg-opacity-60'>
			<div
				className={`relative min-h-[200px] min-w-[320px] rounded-md bg-white ${
					className ?? ""
				}`}>
				<span
					onClick={closeCallback}
					className='absolute right-5 top-0 inline-flex items-center p-1 text-gray-400 hover:text-gray-800 text-lg hover:text-xl cursor-pointer'>
					<FontAwesomeIcon
						icon={faTimes}
						className='w-5 me-3 mt-3 text-xl font-bold'
					/>
				</span>
				{children}
			</div>
		</div>
	);
};

export default Modal;
