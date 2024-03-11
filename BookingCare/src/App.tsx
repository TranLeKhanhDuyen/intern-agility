import './App.css';
import Banner from '@components/Banner';
import Header from '@components/Header';
import ItemHeader from '@components/ListHeader';
import ItemLink from '@components/ListLink/ItemLink';
import ItemOutstanding from '@components/ListLink/ItemOutstanding';
import { BANNER } from '@constants/banner';
import { LIST_HEADER } from '@constants/listHeader';
import { LIST_LINK } from '@constants/listLink';
import { LIST_NAV } from '@constants/listNav';
import { LIST_OUTSTANDING } from '@constants/listOutstanding';
import Footer from '@components/Footer';
import { LIST_FOOTER } from '@constants/footer';
import Media from '@components/Media/index';
import { LIST_MEDIA, MEDIA_VIDEO } from '@constants/media';
import { LIST_HANDBOOK } from '@constants/listHandBook';
import ItemHanbook from '@components/ListLink/ItemHandBook';

const App = () => {
  return (
    <>
      <Header title='' items={LIST_NAV} />
      <Banner title={BANNER[0].title} textField={BANNER[0].textField} />
      <h3 className='container text-bold text-lg'>Comprehensive service</h3>
      <ItemLink items={LIST_LINK[0].items} type='service' />
      <ItemHeader items={LIST_HEADER[0].items} type='specialist' />F
      <ItemLink items={LIST_LINK[1].items} type='specialist' />
      <ItemHeader items={LIST_HEADER[1].items} type='facilities' />
      <ItemLink items={LIST_LINK[2].items} type='facilities' />
      <div className='outstanding'>
        <ItemHeader items={LIST_HEADER[2].items} type='outstanding' />
        <ItemOutstanding items={LIST_OUTSTANDING[0].items} type='doctor' />
      </div>
      <ItemHeader items={LIST_HEADER[3].items} type='handbook' />
      <ItemHanbook items={LIST_HANDBOOK[0].items} type='handbook' />
      <Media
        title={MEDIA_VIDEO[0].title}
        link={MEDIA_VIDEO[0].link}
        items={LIST_MEDIA[0].items}
      />
      <Footer items={LIST_FOOTER.items} />
    </>
  );
};

export default App;
