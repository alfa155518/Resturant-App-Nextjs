"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "../../../src/css/about.module.css";
import useTeam from "@/hooks/useTeam";

export default function About() {


  const [teamMembers] = useTeam()

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  return (
    <div className={styles.aboutContainer}>
      <div className={styles.container}>
        {/* Hero Section */}
        <motion.section 
          className={styles.heroSection}
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 variants={fadeIn}>Our Story</motion.h1>
          <motion.p variants={fadeIn} className={styles.subtitle}>
            Established in 2010, we've been serving authentic cuisine with passion and dedication for over a decade.
          </motion.p>
        </motion.section>

        {/* Hero Image */}
        <motion.div 
          className={styles.heroImage}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <Image
            src="/images/about.webp"
            alt="Restaurant Interior"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </motion.div>

        {/* Philosophy Section */}
        <motion.section 
          className={styles.philosophySection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeIn} className={styles.content}>
            <h2 className={styles.sectionTitle}>Our Philosophy</h2>
            <p>
              We believe that great food comes from great ingredients. That's why we source only the freshest, highest-quality ingredients from local farmers and suppliers.
            </p>
            <p>
              Every dish is prepared with care, attention to detail, and a commitment to authentic flavors that honor culinary traditions while embracing modern techniques.
            </p>
          </motion.div>
          <motion.div variants={fadeIn} className={styles.imageWrapper}>
          <Image
              src="/images/chief.webp"
              alt="Our Chef"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </motion.div>
        </motion.section>

        {/* Team Section */}
        <motion.section 
          className={styles.teamSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeIn} className={styles.sectionTitle}>
            Meet Our Team
          </motion.h2>
          
          <div className={styles.teamGrid}>
            {teamMembers?.team?.slice(1,4).map((member, index) => (
              <motion.div 
                key={index} 
                variants={fadeIn}
                className={styles.teamCard}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className={styles.memberImage}>
                <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <h3 className={styles.memberName}>{member.name}</h3>
                <p className={styles.memberRole}>{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Testimonials Section */}
        <motion.section 
          className={styles.testimonialSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeIn} className={styles.sectionTitle}>
            What Our Customers Say
          </motion.h2>
          
          <div className={styles.testimonialGrid}>
            {[
              { text: "The best dining experience I've had in years. The flavors were extraordinary and the service impeccable.", author: "Emma Thompson" },
              { text: "A hidden gem with authentic cuisine that transported me back to my grandmother's kitchen. Absolutely delightful!", author: "James Wilson" }
            ].map((testimonial, index) => (
              <motion.div 
                key={index} 
                variants={fadeIn}
                className={styles.testimonialCard}
              >
                <p className={styles.quote}>{testimonial.text}</p>
                <p className={styles.author}>— {testimonial.author}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Visit Section */}
        <motion.section 
          className={styles.visitSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeIn} className={styles.sectionTitle}>
            Visit Us
          </motion.h2>
          
          <motion.div variants={fadeIn}>
            <p className={styles.address}>123 Culinary Street, Foodie City</p>
            <p className={styles.hours}>Open Tuesday - Sunday, 5pm - 11pm</p>
          </motion.div>
          
          <motion.button 
            variants={fadeIn} 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={styles.reserveButton}
          >
            Make a Reservation
          </motion.button>
        </motion.section>
      </div>
    </div>
  );
}