import Image from "next/image";
import SectionName from "./ui/SectionName";

export default function ChefRecommendations({ styles, motion }) {
  return (
    <section className={styles.recommendationsSection}>
      <SectionName
        title={"Chef's Recommendations"}
        description={"Handpicked selections from our master chef"}
      />

      <motion.div
        className={styles.recommendationsContainer}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}>
        <div className={styles.chefProfile}>
          <div className={styles.chefImageContainer}>
            <Image
              src="https://res.cloudinary.com/duumkzqwx/image/upload/f_auto,q_auto/v1/laravel-restaurant/team/bfemgrnvidfho9tb8mtr"
              alt="Head Chef"
              width={150}
              height={150}
              priority
              className={styles.chefImage}
            />
          </div>
          <h3>Chef Michael</h3>
          <p>Executive Chef</p>
          <p className={styles.chefQuote}>
            "I recommend trying our signature Grilled Salmon with a side of
            seasonal vegetables. The fresh ingredients and perfect seasoning
            make it a truly unforgettable experience."
          </p>
        </div>

        <div className={styles.weeklySpecial}>
          <h3>Weekly Special</h3>
          <div className={styles.specialDish}>
            <Image
              src="/images/recommended-truffle-risotto.webp"
              alt="Weekly Special"
              width={300}
              height={200}
              priority
              className={styles.specialDishImage}
            />
            <div className={styles.specialDishInfo}>
              <h4>Truffle Risotto</h4>
              <p>
                Creamy Arborio rice cooked with wild mushrooms, finished with
                truffle oil and parmesan
              </p>
              <p className={styles.specialPrice}>$22.99</p>
              <motion.button
                className={styles.orderSpecialButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                Order Special
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
