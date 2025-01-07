import BoxBlockInclude from '@thebigrick/catalyst-payloadcms/gql/query/box-block-include';
import { payloadGraphql } from '@thebigrick/catalyst-payloadcms/service/payload-graphql';

const Fragment = payloadGraphql(`
  fragment SliderBlock on SliderBlock {
    ${BoxBlockInclude}
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

export default Fragment;
