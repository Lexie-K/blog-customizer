import React, { useRef } from 'react';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import styles from './SideBar.module.scss';

interface ISideBar {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

export const SideBar: React.FC<ISideBar> = ({ isOpen, onClose, children }) => {
	const sidebarRef = useRef<HTMLDivElement>(null);
	useOutsideClickClose({
		isOpen: isOpen,
		rootRef: sidebarRef,
		onClose: onClose,
		onChange: onClose,
	});
	return (
		<aside
			ref={sidebarRef}
			className={`${styles.container} ${isOpen ? styles.container_open : ''}`}>
			{children}
		</aside>
	);
};
