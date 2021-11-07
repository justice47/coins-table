function countPercentage(assetPercents, counterAssetsPercents) {
  return ((assetPercents/100+1)/(counterAssetsPercents/100+1)*100-100).toFixed(2)
}

export {
  countPercentage
};
