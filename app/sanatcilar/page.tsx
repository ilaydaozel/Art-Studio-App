import { Slide } from '@/models/slide';
import Carousel from '../components/carousel/Carousel';

const Artists = () => {
  const slide1: Slide = {
    src: 'https://blogimages.musement.com/2019/11/Rijksmuseum-AdobeStock_233087421.jpg',
    caption: 'Test',
    subcaption: 'test caption',
  };

  const slide2: Slide = {
    src: 'https://img.theculturetrip.com/wp-content/uploads/2016/08/hendrick_avercamp_-_winterlandschap_met_ijsvermaak.jpg',
    caption: 'Test 2',
    subcaption: 'test caption 2',
  };
  const slide3: Slide = {
    src: 'https://img.theculturetrip.com/wp-content/uploads/2016/08/hendrick_avercamp_-_winterlandschap_met_ijsvermaak.jpg',
    caption: 'Test 2',
    subcaption: 'test caption 2',
  };

  const slides: Slide[] = [slide1, slide2];
  return (
    <div>
      <Carousel slides={slides} />
    </div>
  );
};

export default Artists;
