import { navigationLinks} from "@/constants/NavigationContent"
import NavLinkComponent from "./NavLinkComponent"

const NavigationLinks = () => {
  return (
    <ul className="flex flex-col gap-2 font-primary max-md:w-full">
        {
            navigationLinks.map((link) => (
                <NavLinkComponent 
                    key={link.title}
                    title={link.title}
                    icon={link.icon}
                    href={link.href}
                />
            ))
        }
    </ul>
  )
}

export default NavigationLinks