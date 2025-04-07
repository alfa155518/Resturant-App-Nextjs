"use client"

import { allTeamMember } from '@/actions/team';
import { createContext, useState, useEffect } from 'react';


// Create the context
export const TeamContext = createContext();


// Provider component
export function TeamProvider({ children }) {

  const [teamMembers, setTeamMembers] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    async function fetchTeamMembers() {
      const { data } = await allTeamMember(pageNumber);
      setTeamMembers(data);
    }
    fetchTeamMembers();
  }, [pageNumber])
  
 



  // Context value
  const value = {
    teamMembers,
    setPageNumber,
  };

  return (
    <TeamContext.Provider value={value}>
      {children}
    </TeamContext.Provider>
  );
}