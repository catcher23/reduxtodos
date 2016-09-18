const initState = {};

export default (state = initState, action) => {
  switch (action.type) {
    case "INC_COUNT":
      return {
        ...state,
        count: (state.count || 0) + 1
      };
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: action.tasks
      }
  }
  return state
}
