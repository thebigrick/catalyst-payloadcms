import { payloadGraphql } from '@thebigrick/catalyst-payloadcms/service/payload-graphql';

const SliderBlockFragment = payloadGraphql(`
  fragment SliderBlock on SliderBlock {
    slidesPerView
    autoplayDelay
    spaceBetween
    showNavigation
    showPagination
    autoplay
    slides {
      title
      cta
      link
      description
      image {
        url
        alt
      }
    }
  }
`);

export default SliderBlockFragment;
