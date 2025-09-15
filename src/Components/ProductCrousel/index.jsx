import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules"; 
import "swiper/css";
import "swiper/css/navigation";

const ProductCarousel = ({ images }) => (
  <Swiper
    spaceBetween={10}
    slidesPerView={1}
    navigation={true}
    modules={[Navigation]}
    className="rounded-xl"
  >
    {images.map((url, i) => (
      <SwiperSlide key={i}>
        <div className="h-64 flex items-center justify-center bg-green-950/40 rounded-xl">
          <img
            src={url}
            alt={`item-${i}`}
            className="max-h-64 w-auto object-contain rounded-xl"
          />
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
);

export default ProductCarousel;
