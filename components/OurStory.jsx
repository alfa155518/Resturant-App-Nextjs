import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from '../src/css/our-story.module.css';
import SectionName from './ui/SectionName';
import Reviews from './Reviews';

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
              <h2>A Culinary Journey</h2>
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
        
        {/* Reviews Section */}
          <Reviews styles={styles}/>
      </div>
    </section>
  );
}
