interface NavigatorProps {
  menus: {
    name: string;
    menus: {
      name: string;
      subMenus: {
        name: string;
        link: string;
      }[];
    }[];
  }[];
}

const Navigator: React.FC<NavigatorProps> = ({ menus }) => {
  return (
    <>
    <ul className="navigator-menu list-unstyled">
hjvygfy
    </ul>
    </>
  )
}
export default Navigator
