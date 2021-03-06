import React, { Component } from 'react'
import Table from 'react-bootstrap/Table';
import { API_PATH } from '../Config';

export class ExpenseTable extends Component {
	constructor(props){
		super(props);
		this.state = {
			expensesTable: []
		}
		this.get_expenses_byuid = this.get_expenses_byuid.bind(this);
		this.get_expenses_bybid = this.get_expenses_bybid.bind(this);
	}

	componentDidMount(){
		//Check to see if a bid was passed to the Component
		if (this.props.dataFromParent === undefined)
			this.get_expenses_byuid();
		else
			this.get_expenses_bybid(this.props.dataFromParent.bid);
	}

	get_expenses_byuid(){
		fetch(API_PATH + '/expense/byuid?start=0&end=50', {
			mode: 'cors',
			method: 'GET',
			credentials: 'same-origin',
			headers: {
				'Accept': 'application/json',
				'Content-type': 'application/json',
				'Authorization': window.localStorage.getItem('jwt')
			}
		}).then(response => {
			console.log(response);
			return response.json();
		}).then(data => {
			console.log('Success:', data);
			if (data != null)
				this.setState({expensesTable:data});
		}).catch((error) => {
			console.error('Error:', error);
		});
	}
	get_expenses_bybid(bid){
		fetch(API_PATH + '/expense?start=0&end=50&bid=' + bid, {
			mode: 'cors',
			method: 'GET',
			credentials: 'same-origin',
			headers: {
				'Accept': 'application/json',
				'Content-type': 'application/json',
				'Authorization': window.localStorage.getItem('jwt')
			}
		}).then(response => {
			console.log(response);
			return response.json();
		}).then(data => {
			console.log('Success:', data);
			if (data != null)
				this.setState({expensesTable:data});
		}).catch((error) => {
			console.error('Error:', error);
		});
	}

	render() {
		return (
			<div>
				<Table
					responsive="sm"
					size="xl"
					style={{paddingBottom:'40px' , paddingTop: '10px'}}
					striped bordered hover variant="dark">
					<thead>
						<tr>
							<th>Date</th>
							<th>Product</th>
							<th>Company</th>
							<th>Payment Method</th>
							<th>Quantity</th>
							<th>Price Per Unit</th>
							<th>Total</th>
							<th>Justification</th>
						</tr>
					</thead>
					<tbody>
						{this.state.expensesTable.map((expense, index) => {
							const {quantity,product,company, date, payment_method, price_per_unit, justification, total,eid} = expense;
							return (
								<tr key={eid}>
									<td> {date.split('T')[0]} </td>
									<td> {product} </td>
									<td>{company}</td>
									<td> {payment_method} </td>
									<td> {quantity}</td>
									<td> {price_per_unit} </td>
									<td> {total} </td>
									<td> {justification} </td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</div>
		);
	}
}
export default ExpenseTable
