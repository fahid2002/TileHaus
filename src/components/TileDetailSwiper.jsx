'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, FreeMode, Navigation } from 'swiper/modules';
import { useState } from 'react';

// Import all necessary styles
import 'swiper/css';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';

export default function TileDetailSwiper({ tile }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  // Safety check: if no tile, don't crash
  if (!tile) return null;

  // Build the correct path for the image
  const mainImage = tile.image.startsWith('/') ? tile.image : `/${tile.image}`;

  return (
    <div style={{ width: '100%', maxWidth: '400px' }}>
      {/* MAIN IMAGE SWIPER */}
      <Swiper
        modules={[Thumbs, FreeMode, Navigation]}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        navigation={true}
        style={{ 
          borderRadius: '12px', 
          marginBottom: '16px',
          overflow: 'hidden',
          backgroundColor: '#f9f9f9',
          border: '1px solid #eee'
        }}
      >
        {/* Slide 1: The Actual Image from MongoDB */}
        <SwiperSlide>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            padding: '20px',
            minHeight: '300px'
          }}>
            <img 
              src={mainImage} 
              alt={tile.title}
              style={{ 
                width: '100%', 
                height: 'auto', 
                maxHeight: '350px', 
                objectFit: 'contain' 
              }}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/400?text=Image+Not+Found";
              }}
            />
          </div>
        </SwiperSlide>

        {/* Optional Slide 2: A Decorative pattern or placeholder */}
        <SwiperSlide>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '340px', background: '#e8e4dc' }}>
             <p style={{ color: '#8b5e2d', fontFamily: 'serif' }}>Texture View</p>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* THUMBNAILS */}
      <Swiper
        onSwiper={setThumbsSwiper}
        modules={[Thumbs, FreeMode]}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        style={{ cursor: 'pointer' }}
      >
        {/* Thumbnail 1: The Main Image */}
        <SwiperSlide style={{ borderRadius: '6px', overflow: 'hidden', border: '2px solid #b5651d' }}>
          <img src={mainImage} style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
        </SwiperSlide>

        {/* Extra Decorative Thumbs */}
        <SwiperSlide style={{ borderRadius: '6px', background: '#c9956e', height: '60px' }} />
        <SwiperSlide style={{ borderRadius: '6px', background: '#2d4a3e', height: '60px' }} />
        <SwiperSlide style={{ borderRadius: '6px', background: '#d4c4b0', height: '60px' }} />
      </Swiper>
    </div>
  );
}