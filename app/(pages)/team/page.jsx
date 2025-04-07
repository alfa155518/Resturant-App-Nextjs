"use client";

import { Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from '../../../src/css/team.module.css';
import Pagination from '@/components/ui/pagination';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import useTeam from '@/hooks/useTeam';
import TeamModel from '@/components/TeamModel';

export default function Team() {
  const [showModal, setShowModal] = useState(false);

  // Custom hook for team members
  const [
    teamMembers,
    setPageNumber,
    containerVariants,
    itemVariants] = useTeam()

  return (
    <div className={styles.teamContainer}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={styles.teamHeader}
      >
        <h1>Our Team</h1>
        <p>Meet the talented individuals who make our restaurant exceptional</p>
      </motion.div>

      <Suspense fallback={<LoadingSpinner />}>
        {
          teamMembers.team?.length > 0 ? (
            <>
              <motion.div
                variants={containerVariants}
                className={styles.teamGrid}
              >
                {teamMembers.team?.map((member) => (
                  <motion.div
                    key={member.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    className={styles.teamCard}
                  >
                    <div className={styles.imageContainer}>
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={300}
                        height={300}
                        className={styles.memberImage}
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
                      />
                    </div>
                    <div className={styles.memberInfo}>
                      <h2>{member.name}</h2>
                      <h3>{member.position}</h3>
                      <p>{member.bio}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <Pagination
                currentPage={teamMembers.current_page}
                totalPages={teamMembers.last_page}
                onPageChange={setPageNumber}
              />
            </>
          )
            : <LoadingSpinner />
        }
      </Suspense>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className={styles.joinTeam}
      >
        <h2>Join Our Team</h2>
        <p>We're always looking for passionate individuals to join our family.</p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={styles.joinButton}
          onClick={() => setShowModal(true)}
        >
          View Openings
        </motion.button>
      </motion.div>

        {/* Team Model */}
      {showModal && (
        <TeamModel
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
}