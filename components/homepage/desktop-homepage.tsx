import { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

interface Props {
	nodes: any;
	originalScreenWidth: any;
	currentScreenWidth: any;
	openLoginScreen: any;
	openSignupScreen: any;
}
const DesktopHomepage: NextPage<Props> = ({
	nodes,
	originalScreenWidth,
	currentScreenWidth,
	openLoginScreen,
	openSignupScreen,
}) => {
	const { data: session } = useSession();

	// Quadratic curve essential points (used inside the svg element "path" property)
	const curve = {
		p_0: {
			x: 55,
			y: 480,
		},
		p_1: {
			x: 1100,
			y: 480,
		},
		p_2: {
			x: 1200,
			y: 0,
		},
		getWidth: function () {
			return this.p_2.x - this.p_0.x;
		},
		getHeight: function () {
			return this.p_2.y - this.p_0.y;
		},
		getMinWidth: function () {
			return this.p_2.x - this.p_0.x;
		},
	};

	const delta_x = curve.getWidth() / (nodes.length + 2 - 1); // curve width / number of gaps between nodes [nodes.length + 2 other nodes (the first node and the last node)]
	const t_1 = 0.05 / nodes.length;
	const t_values = [t_1];
	const nodeWidth = 100;

	const getX = (t: number, flag = false) => {
		if (flag) {
			console.log(t_values);
		}
		return Math.round(
			Math.pow(1 - t, 2) * curve.p_0.x +
			2 * (1 - t) * t * curve.p_1.x +
			Math.pow(t, 2) * curve.p_2.x
		);
	};
	const getY = (t: number) =>
		Math.round(
			Math.pow(1 - t, 2) * curve.p_0.y +
			2 * (1 - t) * t * curve.p_1.y +
			Math.pow(t, 2) * curve.p_2.y
		);

	const getRelativeXInPixels = (x_pos: number) => {
		let currWidth = currentScreenWidth;
		if (currentScreenWidth > originalScreenWidth) {
			currWidth = originalScreenWidth;
		}
		return Math.round((x_pos * currWidth) / originalScreenWidth) || 0;
	};

	const getDelta_T = (curr_T: number) => {
		const linearEquation_1 = curve.p_0.x - 2 * curve.p_1.x + curve.p_2.x;
		const linearEquation_2 = curve.p_1.x - curve.p_0.x;
		const numerator =
			-1 * (curr_T * linearEquation_1 + linearEquation_2) +
			Math.sqrt(
				Math.pow(curr_T * linearEquation_1 + linearEquation_2, 2) +
				linearEquation_1 * delta_x
			);
		const denominator = linearEquation_1;

		const delta_T = numerator / denominator;
		const next_T = curr_T + delta_T;
		if (!t_values.some((val) => val === next_T)) t_values.push(next_T);
		return delta_T;
	};

	return (
		<>
			<div
				className='flex flex-col pl-[2.8rem] backdrop-opacity-25 bg-black/15 backdrop-blur rounded-4xl flex-grow lg:w-full max-h-[590px] min-h-[540px] mx-auto'
				style={{
					width: getRelativeXInPixels(curve.getWidth() + 200) + "px",
				}}>
				<div
					className='absolute w-[12rem] mx-12 pb-5'
					style={{ left: curve.p_0.x + "px", top: "-110px" }}>
					<Image
						width='160'
						height='99'
						src='/ilogo.webp'
						alt='CaseInPoint'
						className='scale-[1.2]'
					/>
				</div>
				<div
					className='flex h-min text-[16rem] relative z-[9999]'
					style={{
						paddingLeft: getRelativeXInPixels(curve.p_0.x - 30) + "px",
					}}>
					<strong className='text-white text-bolder font-black leading-[17rem]'>
						20X
					</strong>
					<div className='-translate-x-[0.61ch] translate-y-[0.5ch] flex flex-col'>
						<span className='text-[6.9rem] font-hero-light font-light'>
							revenue
						</span>
						<span className='self-end text-[3rem] -translate-y-[3.5rem] font-bold'>
							Journey
						</span>
					</div>
				</div>
				<div className='h-full relative'>
					<div
						className='translate-x-[7rem] translate-y-[2.5rem] flex flex-col gap-3 w-1/4 relative z-[9999]'
						style={{
							paddingLeft: getRelativeXInPixels(curve.p_0.x - 20) + "px",
						}}>
						<p className='text-3xl text-white'>
							Every project is successful
						</p>
						<p className='italic text-lg'>
							Live and on-demand training, virtual reporting, assistance,
							and online expert advice.
						</p>
					</div>
					<div className='absolute bottom-0 w-full h-[52rem] border-slate-600'>
						<div
							className='absolute top-[576px] bg-gray-battleship text-white text-lg flex flex-col pl-[1.3rem] backdrop-opacity-25 bg-black/15 backdrop-blur rounded-4xl flex-grow lg:w-75 max-w-[1300px] max-h-[600px] mx-auto3 pr-6 py-1 rounded-full z-[9999]'
							style={{
								left: `${curve.p_0.x + nodeWidth * 2 - 268}px`,
							}}>
							Free. No subscription needed
						</div>
						<span
							className='absolute top-[575px] text-white font-bold text-2xl z-[9999]'
							style={{
								left: `${curve.p_0.x + nodeWidth * 2 + "px"}`,
							}}>
							Subscribers only
						</span>
						<div
							className='-translate-x-1/2 -translate-y-1/2 absolute flex items-center justify-center w-[10rem] aspect-square p-2 lg:p-3 break-words bg-[#1DAB52] drop-shadow-lg rounded-full z-[99999]'
							style={{
								left: getRelativeXInPixels(curve.p_0.x) + "px",
								top: curve.p_0.y,
							}}>
							<div className='text-center'>
								{!(session?.user as any)?.id && (
									<>
										<div className='text-slate-700 font-bold'>Start</div>
										<div
											onClick={openSignupScreen}
											className='font-bold text-white text-center cursor-pointer'>
											Register
										</div>
										<div className='text-slate-700'>- OR -</div>
										<div
											onClick={openLoginScreen}
											className='font-bold text-white text-center cursor-pointer'>
											Login
										</div>
									</>
								)}
								{!!(session?.user as any)?.id && (
									<>
										<div className="text-lg font-bold">WELCOME</div>
										<div className='text-slate-700'>
											{(session?.user as any)?.fullName?.toUpperCase()}
										</div>
										<div
											onClick={() => {
												signOut();
											}}
											className='font-bold text-white text-center cursor-pointer text-lg'>
											Logout
										</div>
									</>
								)}
							</div>
						</div>
						{nodes.map((node: any, index: number) => (
							<div
								key={index}
								className='text-xl -translate-x-1/2 -translate-y-1/2 absolute flex items-center justify-center aspect-square p-2 lg:p-3 break-words bg-white drop-shadow-lg rounded-full z-[9999]'
								style={{
									width: nodeWidth + "px",
									left:
										getRelativeXInPixels(
											getX(
												t_values[index] +
												getDelta_T(t_values[index])
											)
										) + "px",
									top: getY(
										t_values[index] + getDelta_T(t_values[index])
									),
								}}>
								{session && <Link
									href={node.url}
									className='text-center text-secondary-300 hover:text-secondary-300'>
									{node.text}
								</Link>}
								{
									!session && <span

										className='text-center  text-secondary-300 hover:text-secondary-300'>
										{node.text}
									</span>
								}

							</div>
						))}
						<div
							className='absolute -translate-x-[50%] -translate-y-[50%] w-[12rem] h-[12rem] flex flex-col justify-center items-center text-center bg-gray-800 text-white rounded-full border-aquamarine border-[5px] z-[999]'
							style={{
								left: getRelativeXInPixels(getX(1)) + "px",
								top: getY(1),
							}}>
							<h5 className='font-bold text-3xl'>2-20X</h5>
							<div className='font-light'>Your Revenue</div>
							<div className='font-bold'>in one year</div>
						</div>
					</div>
					<svg className='home-line absolute bottom-0 w-full h-[52rem]'>
						<path
							className='stroke-[5px] stroke-gray-gunmetal fill-none'
							d={`M ${getRelativeXInPixels(curve.p_0.x)} ${curve.p_0.y
								} Q ${getRelativeXInPixels(curve.p_1.x)} ${curve.p_1.y
								} ${getRelativeXInPixels(curve.p_2.x)} ${curve.p_2.y
								}`}></path>
						<path
							className='stroke-[5px] stroke-white fill-none'
							d={`M ${getRelativeXInPixels(
								curve.p_0.x
							)} 240 L ${getRelativeXInPixels(
								curve.p_0.x
							)} 515 L ${getRelativeXInPixels(curve.p_2.x)} 515`}></path>
						<circle
							className='fill-black'
							cx={`${getRelativeXInPixels(
								getRelativeXInPixels(
									getX((t_values[2] - t_values[1]) / 2 + t_values[1])
								) - 20
							)}px`}
							cy='590'
							r='4'></circle>
						{/* {console.log(
                     "curve.p_0.x",
                     curve.p_0.x,
                     "getRelativeXInPixels(getX((t_values[2] - t_values[1]) / 2 + t_values[1]))",
                     getRelativeXInPixels(
                        getX((t_values[2] - t_values[1]) / 2 + t_values[1])
                     ),
                     "nodeWidth",
                     nodeWidth
                  )} */}
						<path
							className='custom-stroke-dasharray stroke-[1px] stroke-gray-gunmetal fill-none'
							d={`M ${getRelativeXInPixels(
								getRelativeXInPixels(
									getX((t_values[2] - t_values[1]) / 2 + t_values[1]) -
									20
								)
							)} 590 L ${getRelativeXInPixels(
								getX((t_values[2] - t_values[1]) / 2 + t_values[1])
							)} 590 L ${getRelativeXInPixels(
								getX((t_values[2] - t_values[1]) / 2 + t_values[1])
							)} 440`}></path>
					</svg>
				</div>
			</div>
		</>
	);
};

export default DesktopHomepage;
