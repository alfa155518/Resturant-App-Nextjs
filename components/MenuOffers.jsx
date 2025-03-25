import SectionName from "./ui/SectionName";

export default function MenuOffers({styles,motion}) {
  return (
    <section className={styles.specialsSection}>
        <SectionName title={"Special Offers"} description={"Limited time promotions you don't want to miss"}/>
        
        <motion.div 
          className={styles.specialsContainer}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className={styles.specialCard}
            whileHover={{ 
              scale: 1.03, 
              boxShadow: '0 15px 30px rgba(0,0,0,0.3)' 
            }}
          >
            <div className={styles.specialBadge}>Limited Time</div>
            <h3>Weekend Brunch</h3>
            <p>Enjoy our special weekend brunch menu with complimentary mimosas</p>
            <p className={styles.specialTime}>Every Sat & Sun, 10am - 2pm</p>
            <motion.button 
              className={styles.learnMoreButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </motion.div>
          
          <motion.div 
            className={styles.specialCard}
            whileHover={{ 
              scale: 1.03, 
              boxShadow: '0 15px 30px rgba(0,0,0,0.3)' 
            }}
          >
            <div className={styles.specialBadge}>50% Off</div>
            <h3>Happy Hour</h3>
            <p>50% off on selected drinks and appetizers</p>
            <p className={styles.specialTime}>Mon-Fri, 4pm - 7pm</p>
            <motion.button 
              className={styles.learnMoreButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
      </section> 
  )
}