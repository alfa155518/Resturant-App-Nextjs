"use client";

import { motion } from 'framer-motion';
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiUser, FiMail, FiPhone, FiClock } from 'react-icons/fi';
import styles from '@/scss/pages/admin/admin-team.module.scss';
import { useState } from 'react';
import Image from 'next/image';

const Team = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  // Sample team data - replace with actual API call
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: 'John Doe',
      position: 'Head Chef',
      email: 'john@example.com',
      phone: '+1 234 567 890',
      department: 'Kitchen',
      status: 'active',
      joinDate: '2022-01-15',
      image: '/images/team/chef1.jpg'
    },
    // Add more sample data as needed
  ]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       member.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = activeFilter === 'all' || member.status === activeFilter;
    
    return matchesSearch && matchesFilter;
  });

  const handleAddMember = (newMember) => {
    setTeamMembers([...teamMembers, { ...newMember, id: teamMembers.length + 1 }]);
    setIsAddModalOpen(false);
  };

  const handleEditMember = (updatedMember) => {
    setTeamMembers(teamMembers.map(member => 
      member.id === updatedMember.id ? updatedMember : member
    ));
    setIsEditModalOpen(false);
    setSelectedMember(null);
  };

  const handleDeleteMember = (id) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      setTeamMembers(teamMembers.filter(member => member.id !== id));
    }
  };

  return (
    <div className={styles.teamContainer}>
      <motion.div 
        className={styles.teamHeader}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Team Management</h1>
        <p>Manage your restaurant team members and their roles</p>
      </motion.div>

      <motion.div 
        className={styles.teamActions}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className={styles.searchContainer}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search team members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        
        <div className={styles.filterButtons}>
          <button 
            className={`${styles.filterButton} ${activeFilter === 'all' ? styles.active : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Members
          </button>
          <button 
            className={`${styles.filterButton} ${activeFilter === 'active' ? styles.active : ''}`}
            onClick={() => setActiveFilter('active')}
          >
            Active
          </button>
          <button 
            className={`${styles.filterButton} ${activeFilter === 'inactive' ? styles.active : ''}`}
            onClick={() => setActiveFilter('inactive')}
          >
            Inactive
          </button>
        </div>
        
        <button 
          className={styles.addButton}
          onClick={() => setIsAddModalOpen(true)}
        >
          <FiPlus /> Add Team Member
        </button>
      </motion.div>

      <motion.div 
        className={styles.teamGrid}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredMembers.length > 0 ? (
          filteredMembers.map((member) => (
            <motion.div 
              key={member.id} 
              className={`${styles.teamCard} ${member.status === 'inactive' ? styles.inactive : ''}`}
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
            >
              <div className={styles.memberImage}>
                {member.image ? (
                  <Image 
                    src={member.image} 
                    alt={member.name}
                    width={120}
                    height={120}
                    className={styles.avatar}
                  />
                ) : (
                  <div className={styles.avatarPlaceholder}>
                    <FiUser size={40} />
                  </div>
                )}
                <span className={`${styles.statusBadge} ${member.status === 'active' ? styles.active : ''}`}>
                  {member.status}
                </span>
              </div>
              
              <div className={styles.memberInfo}>
                <h3>{member.name}</h3>
                <p className={styles.position}>{member.position}</p>
                <p className={styles.department}>{member.department}</p>
                
                <div className={styles.contactInfo}>
                  <div className={styles.contactItem}>
                    <FiMail className={styles.contactIcon} />
                    <span>{member.email}</span>
                  </div>
                  <div className={styles.contactItem}>
                    <FiPhone className={styles.contactIcon} />
                    <span>{member.phone}</span>
                  </div>
                  <div className={styles.contactItem}>
                    <FiClock className={styles.contactIcon} />
                    <span>Joined {new Date(member.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className={styles.actionButtons}>
                  <button 
                    className={styles.editButton}
                    onClick={() => {
                      setSelectedMember(member);
                      setIsEditModalOpen(true);
                    }}
                  >
                    <FiEdit2 /> Edit
                  </button>
                  <button 
                    className={styles.deleteButton}
                    onClick={() => handleDeleteMember(member.id)}
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div 
            className={styles.noResults}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p>No team members found matching your criteria.</p>
          </motion.div>
        )}
      </motion.div>

      {/* Add/Edit Member Modal */}
      {(isAddModalOpen || isEditModalOpen) && (
        <motion.div 
          className={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => {
            setIsAddModalOpen(false);
            setIsEditModalOpen(false);
            setSelectedMember(null);
          }}
        >
          <motion.div 
            className={styles.modalContent}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{isAddModalOpen ? 'Add New Team Member' : 'Edit Team Member'}</h2>
            
            <form className={styles.memberForm}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  defaultValue={selectedMember?.name || ''}
                  placeholder="Enter full name"
                />
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="position">Position</label>
                  <input 
                    type="text" 
                    id="position" 
                    defaultValue={selectedMember?.position || ''}
                    placeholder="e.g., Head Chef"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="department">Department</label>
                  <select 
                    id="department" 
                    defaultValue={selectedMember?.department || ''}
                  >
                    <option value="">Select Department</option>
                    <option value="Kitchen">Kitchen</option>
                    <option value="Service">Service</option>
                    <option value="Management">Management</option>
                    <option value="Bar">Bar</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    defaultValue={selectedMember?.email || ''}
                    placeholder="email@example.com"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="phone">Phone</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    defaultValue={selectedMember?.phone || ''}
                    placeholder="+1 234 567 890"
                  />
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="status">Status</label>
                <select 
                  id="status" 
                  defaultValue={selectedMember?.status || 'active'}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              
              <div className={styles.formGroup}>
                <label>Profile Photo</label>
                <div className={styles.uploadContainer}>
                  <input 
                    type="file" 
                    id="profilePhoto" 
                    accept="image/*"
                    className={styles.fileInput}
                  />
                  <label htmlFor="profilePhoto" className={styles.uploadButton}>
                    Choose File
                  </label>
                  <span className={styles.fileName}>No file chosen</span>
                </div>
              </div>
              
              <div className={styles.formActions}>
                <button 
                  type="button" 
                  className={styles.cancelButton}
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setIsEditModalOpen(false);
                    setSelectedMember(null);
                  }}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className={styles.saveButton}
                  onClick={() => {
                    // Handle form submission
                    const formData = {
                      name: document.getElementById('name').value,
                      position: document.getElementById('position').value,
                      department: document.getElementById('department').value,
                      email: document.getElementById('email').value,
                      phone: document.getElementById('phone').value,
                      status: document.getElementById('status').value,
                      // Add other fields as needed
                    };
                    
                    if (isAddModalOpen) {
                      handleAddMember({
                        ...formData,
                        joinDate: new Date().toISOString().split('T')[0],
                        image: '' // Add image URL after upload
                      });
                    } else {
                      handleEditMember({
                        ...selectedMember,
                        ...formData
                      });
                    }
                  }}
                >
                  {isAddModalOpen ? 'Add Member' : 'Save Changes'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Team;