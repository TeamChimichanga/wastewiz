const createNewUser = (username) => {
  return {
    username,
    points: 0,
  };
};

const addPoints = (user, points) => {
  if (points < 0) {
    throw new Error("Points must be a positive number");
  }

  return {
    ...user,
    points: user.points + points,
  };
};

export default {
  createNewUser,
  addPoints,
};
