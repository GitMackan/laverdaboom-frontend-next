"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

const Reveal = ({
	children,
	align = "left",
	width = "100%",
}: AnimationProps) => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });

	const mainControls = useAnimation();

	useEffect(() => {
		if (isInView) {
			mainControls.start("visible");
		}
	}, [isInView]);
	return (
		<div ref={ref} style={{ width: width, textAlign: align }}>
			<motion.div
				variants={{
					hidden: { opacity: 0, y: 75 },
					visible: { opacity: 1, y: 0 },
				}}
				initial="hidden"
				animate={mainControls}
				transition={{ duration: 0.8 }}
			>
				{children}
			</motion.div>
		</div>
	);
};

export default Reveal;

interface AnimationProps {
	children: JSX.Element;
	align?: "left" | "center";
	width?: "fit-content" | "100%";
}
