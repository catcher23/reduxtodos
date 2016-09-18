import * as types from '../constants/tasks';

export const subscribe = () => {
  return (dispatch, getState, { Meteor, Tracker, Collections }) => {
    let subs = Meteor.subscribe('allTodos');
    let computation = Tracker.autorun(() => {
      if (subs.ready()) {
        dispatch({
          type: types.UPDATE_TASK,
          tasks: Collections.Todos.find().fetch()
        })
      }
    });
    return computation
  }
};

export const addTask = (task) => {
  return (dispatch, getState, { Meteor }) => {
    Meteor.call("addTask", task, (err, res) => {
      if (err) return console.error(err)
    });
  }
};

export const removeTask = (taskId) => {
  return (dispatch, getState, { Meteor }) => {
    Meteor.call("removeTask", taskId, (err, res) => {
      if (err) return console.error(err)
    });
  }
};
