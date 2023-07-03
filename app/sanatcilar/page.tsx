import { Slide } from '@/models/slide';
import Carousel from '../components/carousel/Carousel';
import ArtworkList from '../components/artwork/ArtworkList';

const Artists = () => {
  const slide1: Slide = {
    src: 'https://blogimages.musement.com/2019/11/Rijksmuseum-AdobeStock_233087421.jpg',
    caption: 'Sergimize hoş geldiniz',
    subcaption: 'test caption',
  };

  const slide2: Slide = {
    src: 'https://img.theculturetrip.com/wp-content/uploads/2016/08/hendrick_avercamp_-_winterlandschap_met_ijsvermaak.jpg',
    caption: 'En iyi sanal sergi deneyimi',
    subcaption: 'test caption 2',
  };
  const slide3: Slide = {
    src: 'https://doagahehoc242.cloudfront.net/uploads/posts/792/8563e153_hopper.jpg',
    caption: 'Modern Zamanlar',
    subcaption: 'test caption 3',
  };

  const slides: Slide[] = [slide1, slide2, slide3];
  return (
    <div>
      <Carousel slides={slides} />
      <div>
        <ArtworkList title={'Eserler'}></ArtworkList>
      </div>
    </div>
  );
};

export default Artists;
