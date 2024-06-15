import React from "react";
import { Dog } from "@/app/dogs/page";
import DropdownMenu from "./Dropdown";

const MobileSidebar = ({ dogs }: MobileSidebarProps) => {
	return <DropdownMenu options={dogs} title="Välj hund" />;
};

export default MobileSidebar;

interface MobileSidebarProps {
	dogs: Dog[] | undefined;
}
