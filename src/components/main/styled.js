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
  width: 100%;
  max-width: 1320px;
  margin: 0 auto;
  padding: 2rem 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`;

const TableWrap = styled.div`
  width: 100%;
  height: 90vh;
  overflow: scroll;
`;

const Table = styled.table`
  user-select: none;
`;

const TableBodyTR = styled.tr`
  height: 30px;
`;

const TableHeadTR = styled.tr`
  top: 0;
  position: sticky;
`;

const TableBodyTD = styled.td`
  text-align: center;
  min-width: 70px;
  max-width: 70px;
  overflow: hidden;
`;

const TableBodyTH = styled.th`
  position: sticky;
  left: 0;
  background: white;
`;

const TableHeadTH = styled.th`
  padding: 3px;
  width: 25vw;
  background: white;

  &:first-child {
    position: sticky;
    left: 0;
    z-index: 2;
  }
`;

export {
  Container,
  MainWrap,
  TableWrap,
  Table,
  TableBodyTR,
  TableHeadTR,
  TableBodyTD,
  TableBodyTH,
  TableHeadTH
};