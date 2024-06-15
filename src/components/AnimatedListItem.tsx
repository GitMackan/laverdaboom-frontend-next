"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimatedListItemProps {
	children: React.ReactNode;
	index: number;
	className?: string;
}

const AnimatedListItem = ({
	children,
	index,
	className,
}: AnimatedListItemProps) => {
	const fadeInAnimationVariants = {
		initial: {
			opacity: 0,
			y: 100,
		},
		animate: (index: number) => ({
			opacity: 1,
			y: 0,
			transition: {
				delay: 0.05 * index,
			},
		}),
	};

	return (
		<motion.li
			className={className}
			key={index}
			variants={fadeInAnimationVariants}
			initial="initial"
			whileInView="animate"
			viewport={{
				once: true,
			}}
			custom={index}
		>
			{children}
		</motion.li>
	);
};

export default AnimatedListItem;
