import { Wrapper } from './styled'

export default function Select({ onChange }) {
  const handleChange = (e) => {
    if (onChange) onChange(e);
  };

  return (
    <Wrapper>
      <select
        className="select"
        defaultValue="24h"
        onChange={handleChange}
      >
        <option value="1h">1 hour</option>
        <option value="24h">24 hours</option>
        <option value="7d">7 days</option>
        <option value="30d">30 days</option>
      </select>
    </Wrapper>
  )
}
