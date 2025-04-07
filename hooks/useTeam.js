
import { TeamContext } from "@/store/TeamProvider";
import { useContext } from "react";

export default function useTeam() {
  const {teamMembers,setPageNumber} = useContext(TeamContext);

  // animation effects
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };


  return [
    teamMembers,
    setPageNumber,
    containerVariants,
    itemVariants
  ]

}