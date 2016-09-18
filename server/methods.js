import { Meteor } from 'meteor/meteor';
import { Todos } from '../imports/lib/collection';

export default function () {
  Meteor.methods({
    'addTask': (task) => {
      Todos.insert(task)
    }
  });
  Meteor.methods({
    'removeTask': (taskId) => {
      Todos.remove({_id: taskId})
    }
  })
}
