import styled from 'styled-components';

export const MindMapContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #ffffff;
  border: 2px solid #d1d1d1; // Increased border thickness for better definition.
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); // Enhanced shadow for depth.
`;

export const ButtonContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
`;

export const ActionButton = styled.button`
  padding: 12px 24px; // Increased padding for better touch targets.
  background-color: #007BFF;
  border: none;
  border-radius: 6px; // Rounded corners for a modern touch.
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease-in-out; // Smoothed transitions.
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px); // Lift effect on hover.
    box-shadow: 0 4px 10px rgba(0, 123, 255, 0.2);
  }

  &:active {
    transform: scale(0.98); // Subtle press effect.
  }
`;

export const Node = styled.div`
  // ... existing styles
  transition: transform 0.3s ease-out;
`;