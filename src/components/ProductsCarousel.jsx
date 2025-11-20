import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { HotCard } from "./HotCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductCarousel = ({
  products,
  id,
}) => {


  const sekeleton = [1, 2, 3, 4];
  return (
    <>
            <div className="absolute z-50 items-center top-0 w-full h-full flex justify-between gap-2">
          <button
            className={`p-2 swiper-prev-${id} relative -left-5 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 transition-colors`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className={`p-2 swiper-next-${id} relative -right-5 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 transition-colors`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={8}
        rewind={true}
        autoHeight={true}
        navigation={{
          nextEl: `.swiper-next-${id}`,
          prevEl: `.swiper-prev-${id}`,
        }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
        }}
        breakpoints={{
          0: { slidesPerView: 1 },
          500: { slidesPerView: 1.5 },
          750: { slidesPerView: 2 },
          850: { slidesPerView: 3.1 },
          1024: { slidesPerView: 4 },
        }}
        className="!overflow-hidden relative"
      >

        {products.map((item) => {
          return (
            <SwiperSlide key={item.id} className="!h-full">
              <HotCard item={item} key={item.id} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div
        className="swiper-pagination 
      absolute !-bottom-6 left-1/2  z-50"
      ></div>
    </>
  );
};

export default ProductCarousel;
