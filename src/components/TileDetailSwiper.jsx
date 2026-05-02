'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, FreeMode } from 'swiper/modules';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

function PatternBox({ color1, color2 }) {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200" style={{ borderRadius: '8px' }}>
      <defs>
        <pattern id={`dp-${color1}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill={color1} />
          <rect x="1" y="1" width="18" height="18" fill={color2} />
          <path d="M10 1L19 10L10 19L1 10Z" fill="#b5651d" opacity="0.3" />
        </pattern>
      </defs>
      <rect width="200" height="200" fill={`url(#dp-${color1})`} />
    </svg>
  );
}

export default function TileDetailSwiper({ tile }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const variants = [
    { color1: '#c9956e', color2: '#d4a57e' },
    { color1: '#e8e4dc', color2: '#d4c4b0' },
    { color1: '#2d4a3e', color2: '#3a6355' },
  ];

  return (
    <div style={{ width: '100%' }}>
      <Swiper
        modules={[Thumbs, FreeMode]}
        thumbs={{ swiper: thumbsSwiper }}
        style={{ borderRadius: '8px', marginBottom: '10px' }}
      >
        {variants.map((v, i) => (
          <SwiperSlide key={i}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
              <PatternBox color1={v.color1} color2={v.color2} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        modules={[Thumbs, FreeMode]}
        onSwiper={setThumbsSwiper}
        spaceBetween={8}
        slidesPerView={3}
        freeMode
        watchSlidesProgress
        style={{ marginTop: '8px' }}
      >
        {variants.map((v, i) => (
          <SwiperSlide key={i} style={{ cursor: 'pointer' }}>
            <svg width="60" height="60" viewBox="0 0 60 60" style={{ borderRadius: '6px', border: '2px solid #b5651d' }}>
              <rect width="60" height="60" fill={v.color1} />
            </svg>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}