import { motion } from 'framer-motion';
import styles from '../../src/css/sectionName.module.css';

export default function SectionName({ title, description }) {
  return (
    <motion.div
      className={styles.headerContainer}
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>
        {description}
      </p>
    </motion.div>
  );
}