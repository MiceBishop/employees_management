class Employee extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      employee: this.props.employee,
      editMode: false,
      errors: this.props.errors
    }
  }

  setToEditMode() {
    this.setState({ editMode: true })
  }

  handleNameChange(e) {
    var newEmployee = this.state.employee
    newEmployee.name = e.target.value
    this.setState({
      employee: newEmployee
    })
  }
  handleEmailChange(e) {
    var newEmployee = this.state.employee
    newEmployee.email = e.target.value
    this.setState({
      employee: newEmployee
    })
  }
  handleManagerChange(e) {
    var newEmployee = this.state.employee
    newEmployee.manager = e.target.value
    this.setState({
      employee: newEmployee
    })
  }

  handleDeleteEmployee() {
    var that = this
    $.ajax({
      method: 'DELETE',
      url: '/employees/' + that.state.employee.id + '.json',
      success: function(res) {
        that.props.onDeleteEmployee(that.state.employee)
      }
    })
  }

  handleUpdateEmployee() {
    var that = this
    $.ajax({
      method: 'PUT',
      data: {
        employee: that.state.employee,
      },
      url: '/employees/' + that.state.employee.id + '.json',
      success: function(res) {
        that.setState({
          errors: {},
          employee: res,
          editMode: false
        })
      },
      error: function(res) {
         that.setState({errors: res.responseJSON.errors})
      }
    })
  }

  render () {
    return (
      <tr>
        <td><EditableInput type="name" editMode={this.state.editMode} employee={this.state.employee} /></td>
        <td><EditableInput type="email" editMode={this.state.editMode} employee={this.state.employee} /></td>
        <td>
          <EditableCheckbox editMode={this.state.editMode} employee={this.state.employee} />
        </td>
        <td>
          <button
            className="ui labeled icon button primary medium"
            onClick={this.state.editMode ? this.handleUpdateEmployee.bind(this) : this.setToEditMode.bind(this)} 
          >
            {this.state.editMode ? <i className="icon save"></i> : <i className="icon write"></i> }
            {this.state.editMode ? <span>Save</span> : <span>Edit</span> }
          </button>
          <button 
            className="ui labeled icon button negative medium"
            onClick={this.handleDeleteEmployee.bind(this)}
          >
            <i className="icon trash"></i>
            Delete
          </button>
        </td>
      </tr>
    )
  }
}
