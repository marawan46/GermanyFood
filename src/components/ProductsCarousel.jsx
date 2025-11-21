import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Virtual } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { HotCard } from "./HotCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductCarousel = ({ products, productsLoading, id, setShowAllergyModal }) => {
     const sekeleton = [1, 2, 3, 4];
     const hot = products.filter((item)=>item.isHot&&item.isAvailable).map((item)=>item)
     return (
          <>
               <div className="absolute z-30 pointer-events-none items-center top-0 w-full h-full flex justify-between gap-2">
                    <button
                         className={`p-1 swiper-prev-${id} pointer-events-auto relative  rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 transition-colors`}
                    >
                         <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                         className={`p-1 swiper-next-${id} pointer-events-auto relative  rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 transition-colors`}
                    >
                         <ChevronRight className="w-6 h-6" />
                    </button>
               </div>
               <Swiper
                    modules={[Navigation, Pagination,Virtual]}
                    virtual
                    spaceBetween={8}
                    rewind={true}
                    autoHeight={false}
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
                    className="!overflow-hidden relative !w-full"
               >
                    {
                         //see if loading and add skeletion
                    productsLoading ? ["4r","ee","hh","j"].map((i)=>{return <SwiperSlide key={i}><div className="h-[200px] w-full bg-slate-300 animate-pulse"></div></SwiperSlide>})
                    :
                     hot.map((item,index) => {
                         return(
                              <SwiperSlide
                                   virtualIndex={index}
                                   key={item.name}
                                   className="!md:w-full"
                              >
                                   <HotCard
                                        item={item}
                                        setShowAllergyModal={
                                             setShowAllergyModal
                                        }
                                   />
                              </SwiperSlide>
                         )
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
