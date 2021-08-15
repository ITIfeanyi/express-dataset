module.exports = {
  handleStreak: (array) => {
    var newArray = [];
    array.map((arr) => {
      if (!newArray.find((x) => x.actor.id == arr.actor.id)) {
        arr.streakTime = [];
        arr.streakTime.push(new Date(arr.created_at).getTime());
        newArray.push(arr);
      } else {
        newArray.find(
          (x) =>
            x.actor.id === arr.actor.id &&
            x.streakTime.push(new Date(arr.created_at).getTime())
        );
      }
    });
    newArray.map((x) => {
      x.streakTime = x.streakTime.reduce((acc, cur) => acc + cur);
    });
    return newArray
      .sort(
        (a, b) =>
          b.streakTime - a.streakTime ||
          new Date(a.created_at) - new Date(b.created_at) ||
          a.actor.login.toLowerCase().localeCompare(b.actor.login.toLowerCase())
      )
      .map((x) => x.actor);
  },
  eventCount: (arr) => {
    let newArray = [];
    arr.map((arr) => {
      if (!newArray.find((x) => x.actor.id == arr.actor.id)) {
        arr.actor.eventCount = 1;
        newArray.push(arr);
      } else {
        newArray.find(
          (x) => x.actor.id === arr.actor.id && x.actor.eventCount++
        );
      }
    });

    return newArray
      .sort(
        (a, b) =>
          b.actor.eventCount - a.actor.eventCount ||
          new Date(b.created_at) - new Date(a.created_at) ||
          a.actor.login.toLowerCase().localeCompare(b.actor.login.toLowerCase())
      )
      .map((x) => x.actor);
  },
};
