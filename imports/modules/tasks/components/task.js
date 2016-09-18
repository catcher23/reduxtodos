import React, { Component, PropTypes } from 'react';
import {
  Button,
} from 'react-bootstrap';

const Task = (props) => {
  const { removeTask } = props;
  const handleRemoveTask = (taskId, e) => {
    e.preventDefault();
    removeTask(taskId);
  };
  const {priority, input, _id} = props.task;
  return (
    <li>
      <h4 id="priority">{priority + "  "}</h4>
    {input} <Button bsStyle="danger" style={{float: "right"}}
                       onClick={handleRemoveTask.bind(this, _id)}> Remove Task </Button>
    </li>
  );
};

Task.propTypes = {
  task: PropTypes.object.isRequired
};

export default Task
