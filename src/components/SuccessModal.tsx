import React from "react";
import Modal from "react-modal";

interface SuccessModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	message: string;
}

export default function SucessModal({
	isOpen,
	onClose,
	title,
	message,
}: SuccessModalProps) {
	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onClose}
			className="absolute top-[50%] left-[50%] ml-[-50%] flex transform translate-y-[-50%] translate-x-[75%] max-w-full just p-[48px] items-center bg-white font-cursive text-[2.5rem] min-w-[40%] border-[#000] border-[1px]"
			style={{
				overlay: {
					backgroundColor: "rgba(0, 0, 0, 0.4)",
				},
			}}
		>
			<div className="flex relative flex-col items-center gap-[1rem] w-full">
				<div>
					<h2>{title}</h2>
				</div>
				<div>
					<p className="font-secondary text-[1.2rem]">{message}</p>
				</div>
				<button
					className="border-dark border-[0.2px] py-[0.2rem] px-[3rem] bg-accent text-white cursor-pointer mt-[1.5rem]"
					onClick={onClose}
				>
					Stäng
				</button>
			</div>
		</Modal>
	);
}
