class EditableCheckbox extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			editMode: this.props.editMode,
			employee: this.props.employee
		}
	}

	handleChange(e) {
		var newEmployee = this.state.employee
	    newEmployee.manager = !newEmployee.manager
	    this.setState({
	      employee: newEmployee
	    })
		this.setState({ isManager: !this.state.isManager })
	}

	render() {
		return(
			<div>
				{
					this.props.editMode ?
					<input type="checkbox" checked={this.state.employee.manager} onChange={this.handleChange.bind(this)}></input> :
					( 
						this.state.employee.manager ?
						<i className="icon checkmark"></i> :
						<i className="icon close"></i>
					)
				}
			</div>
		)
	}
}