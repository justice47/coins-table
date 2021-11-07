import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  grid-template-areas: "select";
  align-items: center;
  position: relative;

  margin-bottom: 8px;

  select,
  &::after {
    grid-area: select;
  }

  min-width: 40ch;
  max-width: 50ch;

  border: 1px solid grey;
  border-radius: 0.25em;

  font-size: 1.25rem;
  cursor: pointer;
  line-height: 1.1;

  background-color: #fff;
  background-image: linear-gradient(to top, #f9f9f9, #fff 33%);

  &:not(.select--multiple)::after {
    content: "";
    justify-self: end;
    width: 0.8em;
    height: 0.5em;
    margin-right: 8px;
    background-color: grey;
    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
  }

  select:after {
    grid-area: select;
  }

  select::-ms-expand {
    display: none;
  }
`;

export { Wrapper };
