import React, { Component } from 'react';
import { connect } from 'react-redux';
import Main from '../components/main';
import { subscribe, addTask } from  '../actions';
import { modelReducer, formReducer } from 'react-redux-form'

// dummy
class container extends Component {
  componentDidMount() {
    this.computation = this.props.subscribe();
  }
  componentWillUnmount() {
    this.computation.stop()
  }
  render() {
    return <Main {...this.props} />
  }
}

const mapState = (state) => {
  const {tasks, count} = state.Tasks;
  return {
    tasks,
    count,
    task: state.task,
    taskForm: state.taskForm
  }
};

const mapDispatch = (dispatch) => {
  return {
    subscribe: () => dispatch(subscribe()),
    addTask: (task) => dispatch(addTask(task))
  }
};
export default connect(mapState, mapDispatch)(container)
