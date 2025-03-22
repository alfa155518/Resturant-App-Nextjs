"use client"
import React from 'react';
import { useFormStatus } from 'react-dom';
import styles from '../../src/css/submitButton.module.css'

// This is a separate component that uses useFormStatus
function SubmitButton({ text }) {
  const { pending } = useFormStatus();
  
  return (
    <button 
      type="submit" 
      disabled={pending} 
      aria-disabled={pending}
      className={styles.submitBtn}
    >
      {pending ? (
        <div className={styles.loadingSpinner} aria-hidden="true"></div>
      ) : null}
      <span>{pending ? "Submitting..." : text || "Submit"}</span>
    </button>
  );
}

// Main component that wraps the button
const SubmitButtonWrapper = ({ text }) => {
  return (
    <div className={styles.submitBtnWrapper}>
      <SubmitButton text={text} />
    </div>
  );
}

export default SubmitButtonWrapper;