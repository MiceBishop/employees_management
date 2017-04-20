class EditableInput extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			editMode: this.props.editMode,
			employee: this.props.employee,
			type: this.props.type
		}
	}

	handleChange(e) {
		if (this.state.type == "name") {
			var newEmployee = this.state.employee
		    newEmployee.name = e.target.value
		    this.setState({
		      employee: newEmployee
		    })
		} else {
			var newEmployee = this.state.employee
		    newEmployee.email = e.target.value
		    this.setState({
		      employee: newEmployee
		    })
		}
	}

	render() {
		return(
			<div>
				{
					this.props.editMode ?
					<div className="ui input">
						<input
							type="text"
							value={this.state.type == "name" ? this.state.employee.name : this.state.employee.email}
							onChange={this.handleChange.bind(this)} >
						</input>
					</div> :
					<span>{this.state.type == "name" ? this.state.employee.name : this.state.employee.email}</span>
				}
			</div>
		)
	}
}