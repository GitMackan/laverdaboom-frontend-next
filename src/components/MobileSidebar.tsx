import React from "react";
import DropdownMenu from "./Dropdown";
import { Database } from "@/types/supabase";

type Dog = Database['public']['Tables']['dogs']['Row']

const MobileSidebar = ({ dogs }: MobileSidebarProps) => {
	return <DropdownMenu options={dogs} title="Välj hund" />;
};

export default MobileSidebar;

interface MobileSidebarProps {
	dogs: Dog[] | undefined;
}
