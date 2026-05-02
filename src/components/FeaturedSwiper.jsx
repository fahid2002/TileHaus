'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import TileCard from './TileCard';

export default function FeaturedSwiper({ tiles }) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={16}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      breakpoints={{
        480: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
      }}
      style={{ paddingBottom: '40px' }}
    >
      {tiles.map((tile) => (
        <SwiperSlide key={tile.id}>
          <TileCard tile={tile} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}