import './ItemNav.css'

export interface INavItemProps {
  title: string;
  subsTitle?: string;
}

const ItemNav = ({ title, subsTitle = 'subtitle' }: INavItemProps) => {
  return (
    <div className="cursor item-nav">
      <p className='text-turquoise-dark text-bold title-nav'>{title}</p>
      <p className='text-dark-gray subs-title-nav'>{subsTitle}</p>
    </div>
  )
}

export default ItemNav
