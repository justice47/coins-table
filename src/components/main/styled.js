import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`;

const MainWrap = styled.div`
  padding: 20px 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`;

export { Container, MainWrap };