import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from '../src/css/our-story.module.css';
import SectionName from './ui/SectionName';

export default function OurStory() {
  return (
    <section className={styles.ourStorySection}>
      <div className={styles.container}>
        <motion.div 
          className={styles.storyContent}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <SectionName title={"Our Story"} />
          
          <div className={styles.storyGrid}>
            <motion.div 
              className={styles.storyText}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3>A Culinary Journey</h3>
              <p>
                Founded in 2010, our restaurant began as a small family kitchen with a big dream. 
                What started as a passion for authentic flavors has evolved into a culinary 
                destination loved by locals and travelers alike.
              </p>
              <p>
                Our chefs combine traditional techniques with innovative approaches, 
                creating dishes that tell a story with every bite. We source only the 
                freshest ingredients from local farmers and suppliers who share our 
                commitment to quality and sustainability.
              </p>
              <motion.button 
                className={styles.storyButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Read More
              </motion.button>
            </motion.div>
            
            <motion.div 
              className={styles.storyImage}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Image 
                src="/images/our-story.webp" 
                alt="Our Restaurant Story" 
                width={500} 
                height={400}
                className={styles.mainImage}
              />
            </motion.div>
          </div>
        </motion.div>
        
        {/* Testimonials Section */}
        <div className={styles.testimonialsSection}>
        <SectionName title={"Our Clients Say"} />
          
          <div className={styles.testimonialGrid}>
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                className={styles.testimonialCard}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
              >
                <div className={styles.testimonialContent}>
                  <div className={styles.quoteIcon}>"</div>
                  <p>{testimonial.text}</p>
                  <div className={styles.testimonialAuthor}>
                    <div className={styles.authorImage}>
                      <Image 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        width={60} 
                        height={60}
                        priority
                      />
                    </div>
                    <div className={styles.authorInfo}>
                      <h4>{testimonial.name}</h4>
                      <p>{testimonial.title}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Testimonial data
const testimonials = [
  {
    name: "Sarah Johnson",
    title: "Food Blogger",
    image: "/images/reviewer.webp",
    text: "The flavors at this restaurant are simply extraordinary. Each dish tells a story of passion and creativity. I've never experienced such a perfect blend of tradition and innovation."
  },
  {
    name: "Michael Chen",
    title: "Regular Customer",
    image: "/images/reviewer.webp",
    text: "I've been coming here for years and the quality has never wavered. The staff treats you like family and the atmosphere makes every meal feel special."
  },
  {
    name: "Emily Rodriguez",
    title: "Food Critic",
    image: "/images/reviewer.webp",
    text: "In a city full of dining options, this restaurant stands out for its commitment to excellence. The attention to detail in every aspect of the dining experience is remarkable."
  }
];