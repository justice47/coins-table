export default async function fetchCoinData(req, res) {
  const { timeFrame } = req.query
  const response = await fetch(`https://coin360.com/api/coins?currency=USD&updates_from=1629894793&period=${timeFrame}&no_charts=true`);
  const data = await response.json()
  
  res.send(data)
}
