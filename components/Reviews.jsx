import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { IoIosStar } from "react-icons/io";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay,  } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import SectionName from './ui/SectionName';
import LoadingSpinner from './ui/LoadingSpinner';

export default function Reviews({ styles }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function getReviews(pageNumber = 1) {
      const response = await fetch(`${apiUrl}/reviews?page=${pageNumber}`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      })
      const data = await response.json();
      return setReviews(data);
    }
    getReviews();
  }, [apiUrl])
  console.log(reviews);

  if (!reviews) return <LoadingSpinner/>;

  return (
    <div className={styles.testimonialsSection}>
       <SectionName title={"Our Clients Say"} />
    <div className={styles.testimonialGrid}>
      <Swiper
        modules={[Autoplay]}
        slidesPerView="auto"
        centeredSlides={false}
        spaceBetween={30}
        loop={true}
        speed={1000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          reverseDirection: false,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2.5,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 3.5,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4.5,
            spaceBetween: 50,
          },
        }}
        className="mySwiper"
      >
        {reviews.data?.reviews?.map((reviewer, index) => (
          <SwiperSlide key={reviewer.id || index}>
            <motion.div
              className={styles.testimonialCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
              }}
            >
              <div className={styles.testimonialContent}>
                <div className={styles.quoteIcon}>"</div>
                <p>{reviewer.review}</p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.authorImage}>
                    <Image
                      src={reviewer.user?.avatar || "/images/default-reviewer.webp"}
                      alt={`${reviewer.client_name}'s review`}
                      width={60}
                      height={60}
                      priority={index < 4}
                    />
                  </div>
                  <div className={styles.authorInfo}>
                    <h3>{reviewer.client_name}</h3>
                    <div className={styles.rating}>
                      {Array.from({ length: reviewer.rating }, (_, i) => (
                        <IoIosStar key={i} className={styles.starIcon} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    </div>
  )
}