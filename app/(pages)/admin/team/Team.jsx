"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiUserPlus, FiSearch } from 'react-icons/fi';
import { useEffect } from 'react';
import styles from '../../../../src/css/admin-team.module.css';
import TeamModal from '@/app/(pages)/admin/team/TeamModal';
import useAdminManageTeam from '@/hooks/useAdminManageTeam';
import CustomSkeletonLoading from '@/components/CustomSkeletonLoading';
import MemberCard from '@/app/(pages)/admin/team/MemberCard';


const Team = () => {

  // useAdminManageTeam custom hook
  const [teamMembers,
    searchTerm,
    setSearchTerm,
    roleFilter,
    setRoleFilter,
    isModalOpen,
    memberToEdit,
    imagePreview,
    filteredMembers,
    handleEdit,
    handleDelete,
    handleAddNew,
    closeModal,
    formData,
    setFormData,
    getFormValues,
    handleFileChange,
    handleSubmit, roles, teamGridVariants, teamMemberVariants] = useAdminManageTeam();


  // Clean up object URL on unmount
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);


  // Initialize form data when memberToEdit or modal opens
  useEffect(() => {
    if (isModalOpen) {
      setFormData(getFormValues(memberToEdit));
    }
  }, [memberToEdit, isModalOpen]);


  // If no team members are found, show a loading skeleton
  if (!teamMembers || teamMembers.length === 0) {
    return (
      <CustomSkeletonLoading />
    );
  }

  return (
    <div className={styles.teamDashboard}>
      <div className={styles.dashboardContent}>
        <div className={styles.teamContainer}>
          <div className={styles.teamHeader}>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className={styles.sectionName}
            >
              Team Members
            </motion.h2>
            <div className={styles.actions}>
              <div className={styles.searchBar}>
                <FiSearch className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search team members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
                  name='searchTerm'
                />
              </div>
              <div className={styles.filterContainer}>
                <FiFilter className={styles.filterIcon} />
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className={styles.filterSelect}
                  name='roleFilter'
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
              <button className={styles.primaryButton} onClick={handleAddNew}>
                <FiUserPlus /> Add Member
              </button>
            </div>
          </div>
          {/* Member Card */}
          <MemberCard styles={styles} filteredMembers={filteredMembers} handleEdit={handleEdit} handleDelete={handleDelete} teamGridVariants={teamGridVariants} teamMemberVariants={teamMemberVariants} />
        </div>

        {/* Team Member Modal */}
        <AnimatePresence>
          <TeamModal
            styles={styles}
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            memberToEdit={memberToEdit}
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            imagePreview={imagePreview}
            handleFileChange={handleFileChange}
            roles={roles}
          />
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Team;