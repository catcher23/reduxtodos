import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Form, Field, createFieldClass, controls, actions, getField } from 'react-redux-form';
import {
  Button,
  DropdownButton,
  MenuItem,
  ButtonToolbar,
  FormGroup,
  InputGroup,
  FormControl
} from 'react-bootstrap';
import Task from '../containers/task';
import validator from 'validator';

const FormInput = createFieldClass ({
  'InputGroup': controls.text
});

const App = class extends Component {

  render() {
    const { tasks, taskForm, addTask } = this.props;

    const handleAddTask = (e) => {
      e.preventDefault();
      //// Have to use findDOMNode with react-bootstrap
      const node = findDOMNode(this.refs.taskInput);
      const priority = findDOMNode(this.refs.priorityInput).getAttribute("active");

      let task = Object.assign({}, this.props.task);
      task.priority = priority;

      if (node.value.length > 5) {
        addTask(task);
      }


      node.value = null;
      findDOMNode(this.refs.priorityInput).setAttribute("active", "medium");
    };

    const handleSelect = (eventKey) => {
      const element = findDOMNode(this.refs.priorityInput);
      element.setAttribute("active", eventKey);
    };

    const renderTasks = () => {
      let sortedTasks = tasks ? sortByPriority(tasks) : tasks;
      return (sortedTasks ||[]).map((task) => (
        <Task key={task._id} task={task} />
      ));
    };

    const sortByPriority = (tasks) => {
      let high = [],
        medium = [],
        low = [],
        sortedTasks;

        tasks.forEach( (task) => {
          if (task.priority === 'high') high.push(task);
          if (task.priority === 'medium') medium.push(task);
          if (task.priority === 'low') low.push(task);
        });

        sortedTasks = high.concat(medium, low);

        return sortedTasks;
    };

    let title = 'Priority';

    return (
      <div className="container">
        <header>
          <h1>Todo List ({(tasks ||[] ).length})</h1>
        </header>
        <FormGroup>
          <FormInput model="task.input"
                     validators={{
                     required: (val) => val,
                     length: (val) => !val || val.length > 5
                     }}
                     validateOn="blur">
          <InputGroup>
            <FormControl type="text" ref="taskInput"/>
            <InputGroup.Button>
              <Button bsStyle="info" onClick={handleAddTask.bind(this)}> Add Task </Button>
            </InputGroup.Button>
            <InputGroup.Button>
              <DropdownButton title={title} id="bg-nested-dropdown" bsStyle="default" active="" ref="priorityInput"
                              onSelect={function(eventKey) {
                                handleSelect(eventKey);
                              }}
                              validateOn="blur">
                <MenuItem eventKey="high">High</MenuItem>
                <MenuItem eventKey="medium">Medium</MenuItem>
                <MenuItem eventKey="low">Low</MenuItem>
              </DropdownButton>
            </InputGroup.Button>
          </InputGroup>
            { getField(taskForm, 'input').errors.required && <div>Please write something</div> }
            { getField(taskForm, 'input').errors.length && <div>Must be more than 5 characters</div> }
          </FormInput>
        </FormGroup>
        <ul>
          {renderTasks()}
        </ul>
      </div>
    );
  }
};

export default App
