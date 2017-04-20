class Employees extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			employees: this.props.employees,
			employee: {
				name: '',
				email: '',
				manager: false
			},
			errors: {},
		}
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
				var newEmployeeList = that.state.employees
				newEmployeeList.push(res)
				that.setState({
					employees: newEmployeeList,
					employee: {
						name: '',
						email: '',
						manager: false
					},
					errors: {}
				})
				document.getElementById('name-input').value = ""
				document.getElementById('email-input').value = ""
				document.getElementById('manager-input').checked = false
				

			},
			error: function(res) {
				that.setState({errors: res.responseJSON.errors})
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

	handleUpdateAfterDelete(employee) {
		var employeeList = this.state.employees.filter( (item) => employee.id!== item.id )
		this.setState({ employees: employeeList })
	}

	render () {

		employees = this.state.employees.map( (employee) => {
			return(
				<Employee
					key={employee.id}
					employee={employee}
					onDeleteEmployee={this.handleUpdateAfterDelete.bind(this)}
					errors={this.state.errors}
				/>
			)
		})

		valid = this.state.employee.name && this.state.employee.email

    return (
    	<div className="body-container">
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
		    				required
		    				id="name-input"
		    				type="text"
		    				placeholder="John Doe"
		    				name="name"
		    				onChange={this.handleNameChange.bind(this)}
		    			/>
		    		</div>
		    		<div className="field">
		    			<label>Email</label>
		    			<input
		    				required
		    				id="email-input"
		    				type="text"
		    				placeholder="john@doe.com"
		    				name="email"
		    				onChange={this.handleEmailChange.bind(this)}
		    			/>
		    		</div>
		    		<div className="field">
		    				<label>Manager ?</label>
		    				<input type="checkbox" id="manager-input" onChange={this.handleManagerChange.bind(this)} />
		    		</div>
		    		<button
		    			className="ui labeled icon button green"
		    			type="submit"
		    			onClick={this.handleSubmit.bind(this)}
		    			disabled={!valid}
		    		>
            	<i className="icon add user"></i>
		    			Hire
		    		</button>
		    	</div>
	    	</div>

	    	<div>
		    	<h1>List of Employees</h1>
		    	<div className="employees ui centered grid">
		    		<table className="ui celled table">
		    			<thead>
		    				<tr>
		    					<th>Name</th>
		    					<th>Email</th>
		    					<th>Is manager ?</th>
		    					<th>Actions</th>
		    				</tr>
		    			</thead>
		    			<tbody>
		    				{employees}
		    			</tbody>
		    		</table>
		    	</div>
		    </div>
		   </div>
    )
	}
}

