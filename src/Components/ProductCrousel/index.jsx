import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules"; // ✅ import navigation
import "swiper/css";
import "swiper/css/navigation";

const ProductCarousel = ({ images }) => (
  <Swiper
    spaceBetween={10}
    slidesPerView={1}
    navigation={true} // ✅ enable navigation arrows
    modules={[Navigation]} // ✅ include the Navigation module
    className="rounded-xl"
  >
    {images.map((url, i) => (
      <SwiperSlide key={i}>
        <img src={url} alt={`item-${i}`} className="w-full rounded-xl" />
      </SwiperSlide>
    ))}
  </Swiper>
);

export default ProductCarousel;