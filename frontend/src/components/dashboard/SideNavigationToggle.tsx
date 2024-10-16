import { RiMenuFill } from "react-icons/ri";
import Sidenav from "./Sidenav"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import VisuallyHidden from "../features/VisuallyHidden"

const SideNavigationToggle = () => {
  return (
    <Sheet>
      <SheetTrigger className="p-1 rounded-md hover:bg-slate-200 transition-all bg-slate-100 md:hidden"> <RiMenuFill size={20} /></SheetTrigger>
      <SheetContent side={'left'} className="w-[250px] md:hidden">
        {/* Visually Hidden */}
        <VisuallyHidden>
          <SheetHeader>
            <SheetTitle>Collab Lab</SheetTitle>
            <SheetDescription>
              A side navigation for mobile devices
            </SheetDescription>
          </SheetHeader>
        </VisuallyHidden>

        {/* Side Navigation Rendered Here */}
        <Sidenav />
      </SheetContent>
    </Sheet>
  )
}

export default SideNavigationToggle