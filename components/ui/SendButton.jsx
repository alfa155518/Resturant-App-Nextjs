"use client"
import React from 'react';
import styled from 'styled-components';
import { useFormStatus } from 'react-dom';

// This is a separate component that uses useFormStatus
function SubmitButton({ text }) {
  const { pending } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending} aria-disabled={pending}>
      <div className="svg-wrapper-1">
        <div className="svg-wrapper">
          {pending ? (
            <div className="loading-spinner" aria-hidden="true"></div>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} aria-hidden="true">
              <path fill="none" d="M0 0h24v24H0z" />
              <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" />
            </svg>
          )}
        </div>
      </div>
      <span>{pending ? "Loading..." : text}</span>
    </button>
  );
}

// Main component that wraps the button
const SendButton = ({ text }) => {
  return (
    <StyledWrapper>
      <SubmitButton text={text} />
    </StyledWrapper>
  );
}


const StyledWrapper = styled.div`
  button {
    font-family: inherit;
    font-size: 1.2rem;
    background:#9f643c;
    color: white;
    padding: .2rem 2rem;
    display: flex;
    align-items: center;
    border: none;
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.2s;
    cursor: pointer;
  }

  button:disabled {
    background: #b89174;
    cursor: not-allowed;
  }

  button span {
    display: block;
    margin-left: 0.3em;
    transition: all 0.3s ease-in-out;
  }

  button svg {
    display: block;
    transform-origin: center center;
    transition: transform 0.3s ease-in-out;
  }

  button:hover:not(:disabled) .svg-wrapper {
    animation: fly-1 0.6s ease-in-out infinite alternate;
  }

  button:hover:not(:disabled) svg {
    transform: translateX(1.2em) rotate(45deg) scale(1.1);
  }

  button:hover:not(:disabled) span {
    transform: translateX(5em);
  }

  button:active:not(:disabled) {
    transform: scale(0.95);
  }

  .loading-spinner {
    width: 24px;
    height: 24px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 1s ease-in-out infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes fly-1 {
    from {
      transform: translateY(0.1em);
    }

    to {
      transform: translateY(-0.1em);
    }
  }`;

export default SendButton;