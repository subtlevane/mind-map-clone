import styled from 'styled-components';

export const MindMapContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #f0f0f0;
  overflow: hidden;
`;

export const ButtonContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
`;

export const ActionButton = styled.button`
  padding: 10px 20px;
  background-color: #007BFF;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    transform: scale(0.95);
  }
`;
