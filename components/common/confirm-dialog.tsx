import Modal from "./modal";
import Spinner from "./spinner";
import { ConfirmDialog } from "../../models/types";

interface Props {
	config: ConfirmDialog;
}

const ConfirmModal = ({ config }: Props) => {
	return (
		<Modal
			config={{
				isShown: config.isShown,
				className: "flex flex-col justify-between p-3",
				closeCallback: () => config.cancelCallback(),
			}}>
			<>
				<div className='min-w-[500px] flex flex-col gap-10 p-5'>
					<h2 className='text-3xl'>{config.title}</h2>
					<p className='text-gray-800'>{config.message}</p>
				</div>
				<div>
					<div className='h-10 flex justify-end px-6'>
						{config.isLoading && (
							<Spinner
								className='text-xl'
								message={config.loadingMessage}
							/>
						)}
					</div>
					<div className='flex justify-end gap-3 px-5 pb-5'>
						<button
							type='button'
							className='btn text-gray-900 hover:shadow-none px-7 text-xl'
							onClick={() => config.cancelCallback()}>
							{config.cancelBtnText}
						</button>
						<button
							type='button'
							className={
								config.isDangerAction
									? "btn-danger px-7 py-2 text-xl"
									: "btn-primary px-7 py-2 text-xl"
							}
							onClick={() => {
								config.actionCallback();
							}}>
							{config.actionBtnText}
						</button>
					</div>
				</div>
			</>
		</Modal>
	);
};

export default ConfirmModal;
