import { useEffect, useState } from "react";
import Spinner from "../common/spinner";
import { object, string } from "yup";
import { NextPage } from "next";
import Modal from "../common/modal";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { IIdea } from "../../models/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as clientApi from "../../http-client/ideas.client";
import { IUserIdeas } from "../../models/user-idea";

interface Props {
	isOpen: boolean;
	toggle: () => void;
}

const IdeasModal: NextPage<Props> = ({ isOpen, toggle }) => {
	const [ideaFactors, setIdeaFactors] = useState<IIdea[]>([]);
	const [userIdeasId, setUserIdeasId] = useState<string>("");

	const { data, isLoading } = useQuery<IUserIdeas>({
		queryKey: [clientApi.Keys.AllLookup],
		queryFn: clientApi.getOneLookup,
		refetchOnWindowFocus: false,
		enabled: isOpen,
	});

	useEffect(() => {
		if (data) {
			setIdeaFactors(data.ideas);
			setUserIdeasId(data.id);
		}
	}, [data]);

	const queryClient = useQueryClient();

	const { mutate: updateIdea, isLoading: isUpdatingIdea } = useMutation(
		(idea: IIdea) => {
			return clientApi.updateOneLookup(idea);
		},
		{
			onSuccess: (updated) => {
				queryClient.invalidateQueries([clientApi.Keys.AllLookup]);
			},
		}
	);

	const { mutate: createIdea, isLoading: isCreatingIdea } = useMutation(
		(idea: IIdea) => {
			return clientApi.insertOneLookup(idea);
		},
		{
			onSuccess: (updated) => {
				queryClient.invalidateQueries([clientApi.Keys.AllLookup]);
			},
		}
	);

	const { mutate: deleteIdea, isLoading: isDeletingIdea } = useMutation(
		(id: string) => {
			return clientApi.deleteOne(id);
		},
		{
			onSuccess: (updated) => {
				queryClient.invalidateQueries([clientApi.Keys.AllLookup]);
			},
		}
	);

	if (!isOpen) return <></>;

	return (
		<>
			<Modal
				config={{
					className:
						"p-5 lg:p-10 w-2/3 min-w-[320px] max-w-[850px] max-h-[650px]",
					isShown: isOpen,
					closeCallback: toggle,
				}}>
				<div className='flex flex-col gap-7'>
					<h2 className='flex gap-5 items-center text-4xl text-gray-700 mb-5'>
						Ideas{" "}
						{(isCreatingIdea || isDeletingIdea || isUpdatingIdea) && (
							<Spinner
								className='text-lg items-center font-normal'
								message='Saving Ideas ...'
							/>
						)}
					</h2>
				</div>
				<div className='h-[85%] overflow-auto'>
					<div className='relative flex-auto py-3'>
						{isLoading && (
							<Spinner
								className='mb-10 text-lg'
								message='Loading ideas ...'></Spinner>
						)}
						{!ideaFactors?.length && !isLoading && (
							<div className='w-full flex items-center'>
								<p className='mb-10 text-xl text-center italic'>
									Start adding your ideas...
								</p>
							</div>
						)}
						{!!ideaFactors?.length && (
							<ul className='flex flex-col gap-2 mb-5 max-h-[350px] overflow-auto'>
								{ideaFactors.map((idea: IIdea, index: number) => (
									<li
										key={index}
										className='flex gap-5 justify-between items-center text-dark-400 border-t'>
										<div className='flex gap-5'>
											<span className='text-xl'>{idea.name}</span>
											<span>-</span>
											<span className='text-xl'>
												{idea.ownerName}
											</span>
										</div>
										<button
											onClick={() => {
												deleteIdea(idea.uuid);
											}}
											className='flex items-center gap-3 text-lg p-3'
											type='button'>
											<FontAwesomeIcon
												className='w-4 h-auto cursor-pointer text-dark-300 hover:text-dark-400'
												icon={faTimes}
											/>
										</button>
									</li>
								))}
							</ul>
						)}
						<Formik
							initialValues={{
								name: "",
								ownerName: "",
							}}
							validationSchema={object({
								name: string()
									.required("required")
									.test((e) => {
										return !!e.trim();
									}),
							})}
							onSubmit={async (values, actions) => {
								if (userIdeasId) {
									await updateIdea({
										uuid: crypto.randomUUID(),
										name: values.name,
										ownerName: values.ownerName,
									} as IIdea);
								} else {
									await createIdea({
										uuid: crypto.randomUUID(),
										name: values.name,
										ownerName: values.ownerName,
									} as IIdea);
								}
								actions.setSubmitting(false);
								actions.resetForm();
							}}
							validateOnMount>
							{({ values, isSubmitting, isValid }) => (
								<Form>
									<div className='flex flex-wrap gap-5 items-start'>
										<div className='grow flex gap-5'>
											<div className='grow'>
												<Field
													type='text'
													className='w-full light-input'
													placeholder='New idea'
													name='name'
												/>
												<ErrorMessage name={`name`}>
													{(msg) => (
														<div className='text-lg text-rose-500'>
															{msg}
														</div>
													)}
												</ErrorMessage>
											</div>
											<div className='grow max-w-[15rem]'>
												<Field
													type='text'
													className='w-full light-input'
													placeholder='idea owner'
													name='ownerName'
												/>
												<ErrorMessage name={`ownerName`}>
													{(msg) => (
														<div className='text-lg text-rose-500'>
															{msg}
														</div>
													)}
												</ErrorMessage>
											</div>
										</div>
										<div className='grow lg:grow-0 flex justify-end text-xl'>
											<button
												type='submit'
												className={
													isSubmitting
														? "btn-rev btn-disabled"
														: "btn-rev"
												}
												disabled={isSubmitting || !isValid}>
												Add New Idea
											</button>
										</div>
									</div>
								</Form>
							)}
						</Formik>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default IdeasModal;
