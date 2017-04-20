class EmployeeForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			employees: this.props.employees,
			employee: {
				name: '',
				email: '',
				manager: false
			},
			errors: {}
		}

		console.log(this.state.employee)
	}

	handleSubmit() {
		var that = this
		$.ajax({
			method: 'POST',
			data: {
				employee: that.state.employee
			},
			url: 'employees.json',
			success: function(res) {
				var newEmployeeList = that.state.employees;
				newEmployeeList.push(res);
				that.setState({
					employees: newEmployeeList,
					employee: {
						name: '',
						email: '',
						manager: false
					},
					errors: {}
				})
			},
			error: function(res) {
				console.log(res._proto)
			}
		})

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


  render () {
    return(
    	<div className="ui form">
    		<h2 className="ui dividing header">Hire an employee</h2>
    		<div className="ui error message">
    			<div className="header">Error</div>
    			<p>
    				<span>{this.state.errors.name}</span>
    				<span>{this.state.errors.email}</span>
    				<span>{this.state.errors.manager}</span>
    			</p>
    		</div>
    		<div className="inline fields">
	    		<div className="field">
	    			<label>Name</label>
	    			<input
	    				type="text"
	    				placeholder="John Doe"
	    				name="name"
	    				onChange={this.handleNameChange.bind(this)}
	    			/>
	    		</div>
	    		<div className="field">
	    			<label>Email</label>
	    			<input
	    				type="text"
	    				placeholder="john@doe.com"
	    				name="email"
	    				onChange={this.handleEmailChange.bind(this)}
	    			/>
	    		</div>
	    		<div className="field">
	    				<label>Manager ?</label>
	    				<input type="checkbox" onChange={this.handleManagerChange.bind(this)} />
	    		</div>
	    		<button className="ui button primary" type="submit" onClick={this.handleSubmit.bind(this)}>Submit</button>
	    	</div>
    	</div>
    )
  }
}

