import type { MouseEventHandler, ReactNode } from "react";
import Backdrop from "../Backdrop/Backdrop";
import "./Modal.css";

type Props = {
	children: ReactNode;
	show: boolean;
	close: MouseEventHandler<HTMLElement>;
};

const Modal = ({ children, show, close }: Props) => {
	return (
		<>
			<div className="modal"
				style={{
					transform: show ? "translateY(0)" : "translateY(-100vh)",
					opacity: show ? 1 : 0
				}}>
				{children}
			</div>
			<Backdrop show={show} onClick={close} />
		</>
	);
};

export default Modal;
