const getGym = (
  id,
  ownerId,
  name,
  geoLocation,
  imageUrl,
  tradingHours,
  maximumAppointment,
  address
) => {
  return {
    id,
    ownerId,
    name,
    geoLocation,
    imageUrl,
    tradingHours,
    maximumAppointment,
    address,
  };
};

export const gyms = [
  getGym(1, 1, 'a', '1', 'aaa', 'aa-aa', 1, 'wolli'),
  getGym(2, 2, 'b', '1', 'bbb', 'bb-aa', 1, 'wolli'),
  getGym(3, 3, 'a', '1', 'aaa', 'aa-aa', 1, 'wolli'),
  getGym(4, 4, 'b', '1', 'bbb', 'bb-aa', 1, 'wolli'),
  getGym(5, 5, 'a', '1', 'aaa', 'aa-aa', 1, 'wolli'),
  getGym(6, 6, 'b', '1', 'bbb', 'bb-aa', 1, 'wolli'),
];
