export const replaceGymList = (gym, list) => {
  const newList = [...list];
  console.log(gym, list, 111);
  const foundIndex = list.findIndex((each) => each.id === gym.id);
  if (foundIndex) {
    newList[foundIndex] = gym;
  }
  return newList;
};
