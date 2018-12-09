import startupList from './startups'
import nounsList from './nouns'

const getRandomIndex = array => array[Math.floor(Math.random() * array.length)];

export const getIdeaPair = () => ({
  startup: getRandomIndex(startupList),
  noun: getRandomIndex(nounsList)
});