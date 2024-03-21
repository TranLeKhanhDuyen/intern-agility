import ItemLink, { IItemLinkProps, TItemLinkType } from '@components/ItemLink/ItemLink';
import './Slider.css'
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ISliderProps {
  items: IItemLinkProps[];
  types: TItemLinkType
}

const CustomSlider = ({ types, items }: ISliderProps) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 4
  }

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (types === 'banner') {
      const interval = setInterval(() => {
        setCurrentIndex(prevIndex =>
          prevIndex === items.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [types, items]);

  const renderSliderItems = () => {
    if (types === 'banner') {
      return (
        <div className="slider-items">
          <ItemLink {...items[currentIndex]} />
        </div>
      );
    } else {
      return (
        <Slider  {...settings}>
          {items.map(() => (
            <ItemLink />
          ))}
        </Slider>
      );
    }
  };

  return (
    <div className="slider-container">
      {renderSliderItems()}
    </div>
  );
};

export default CustomSlider;