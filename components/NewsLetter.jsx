
export default function NewsLetter({styles,motion}) {
return (
  <section className={styles.newsletterSection}>
  <motion.div 
    className={styles.newsletterContent}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
  >
    <h2>Stay Updated</h2>
    <p>Subscribe to our newsletter for exclusive offers and updates on new menu items</p>
    
    <form className={styles.newsletterForm}>
      <input 
        type="email" 
        placeholder="Your email address" 
        className={styles.emailInput} 
        required 
        name='email'
        autoComplete='email'
      />
      <motion.button 
        type="submit" 
        className={styles.subscribeButton}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Subscribe
      </motion.button>
    </form>
  </motion.div>
</section>
)
}