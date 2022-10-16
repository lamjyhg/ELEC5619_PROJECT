export const replaceGymList = (gym, list) => {
  const newList = [...list];
  console.log(gym);

  const foundGym = list.find((each) => each.id === gym.id);

  if (foundGym) {
    const foundIndex = list.indexOf(foundGym);
    newList.splice(foundIndex, 1, gym);
  }
  return newList;
};
