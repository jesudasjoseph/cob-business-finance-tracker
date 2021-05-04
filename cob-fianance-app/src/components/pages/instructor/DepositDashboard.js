import React from 'react';
import Table from 'react-bootstrap/Table';
import AddDepositDialogButton from '../../layout/AddDepositDialogButton';
import { API_PATH } from '../../Config';

export default class DepositDashboard extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			selectedBid: null,
			depositData: [],
			businessData: [],
			businessName: ''
		};

		this.fetchDepositData = this.fetchDepositData.bind(this);
		this.fetchBusinessData = this.fetchBusinessData.bind(this);

		this.businessTableRowClickHandler = this.businessTableRowClickHandler.bind(this);
	}

	componentDidMount(){
		this.fetchBusinessData();
	}

	fetchBusinessData(){
		fetch(API_PATH + '/business?start=0&end=50', {
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
			this.setState({businessData:data});
		}).catch((error) => {
			console.error('Error:', error);
		});
	}
	fetchDepositData(bid, name){
		fetch(API_PATH + '/deposit?start=0&end=50&bid=' + bid, {
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
			this.setState({selectedBid:bid, businessName:name, depositData:data});
		}).catch((error) => {
			console.error('Error:', error);
		});
	}

	businessTableRowClickHandler(bid, name){
		this.fetchDepositData(bid, name);
	}

	render () {
		if (this.state.selectedBid == null) {
			return (
				<React.Fragment>
				<div style={{display: 'grid', gridTemplateColumns: '20% 70% 10%'}}>
					<div style={{margin: '20px'}}>
						<Table responsive="sm" size="xl" striped bordered hover variant="dark">
							<thead>
								<tr>
									<th>Business</th>
								</tr>
							</thead>
							<tbody>
								{this.state.businessData.map((business, index) => {
									const {name, bid} = business;
									return (
										<tr key={bid} style={{cursor: 'pointer'}} onClick={() => this.businessTableRowClickHandler(bid, name)}>
											<td>{name}</td>
										</tr>
									);
								})}
							</tbody>
						</Table>
					</div>
					<div style={{margin: '20px'}}>
						<h4 style={{color: 'red'}}>Select a business!</h4>
					</div>
					<div style={{margin: '20px'}}>
					</div>
				</div>
				</React.Fragment>
			);
		}
		else if (this.state.depositData != null && this.state.depositData.length ) {
			return (
				<React.Fragment>
					<div  style={{display: 'grid', gridTemplateColumns: '20% 70% 10%'}}>
						<div style={{margin: '20px'}}>
							<Table responsive="sm" size="xl" striped bordered hover variant="dark">
								<thead>
									<tr>
										<th>Business</th>
									</tr>
								</thead>
								<tbody>
									{this.state.businessData.map((business, index) => {
										const {name, bid} = business;
										return (
											<tr key={bid} style={{cursor: 'pointer'}} onClick={() => this.businessTableRowClickHandler(bid, name)}>
												<td>{name}</td>
											</tr>
										);
									})}
								</tbody>
							</Table>
						</div>
						<div style={{margin: '20px'}}>
							<h2>{this.state.businessName}</h2>
							<Table responsive="sm" size="xl" striped bordered hover variant="dark">
								<thead>
									<tr>
										<th>Date</th>
										<th>Amount</th>
										<th>ONID</th>
										<th>Description</th>
									</tr>
								</thead>
								<tbody>
									{this.state.depositData.map((deposit, index) => {
										const {d_id, date, uid, val, description} = deposit;
										return (
											<tr key={d_id}>
												<td>{date.split('T')[0]}</td>
												<td>{val}</td>
												<td>{uid}</td>
												<td>{description}</td>
											</tr>
										);
									})}
								</tbody>
							</Table>
						</div>
						<div style={{margin: '20px'}}>
							<AddDepositDialogButton bid={this.state.selectedBid} style={{margin: '20px'}}/>
						</div>
					</div>
				</React.Fragment>
			);
		}
		else {
			return (
				<React.Fragment>
				<div style={{display: 'grid', gridTemplateColumns: '20% 70% 10%'}}>
					<div style={{margin: '20px'}}>
						<Table responsive="sm" size="xl" striped bordered hover variant="dark">
							<thead>
								<tr>
									<th>Business</th>
								</tr>
							</thead>
							<tbody>
								{this.state.businessData.map((business, index) => {
									const {name, bid} = business;
									return (
										<tr key={bid} style={{cursor: 'pointer'}} onClick={() => this.businessTableRowClickHandler(bid, name)}>
											<td>{name}</td>
										</tr>
									);
								})}
							</tbody>
						</Table>
					</div>
					<div style={{margin: '20px'}}>
						<h2>{this.state.businessName}</h2>
						<h4 style={{color: 'red'}}>This business has no deposits!</h4>
					</div>
					<div style={{margin: '20px'}}>
						<AddDepositDialogButton bid={this.state.selectedBid} style={{margin: '20px'}}/>
					</div>
				</div>
				</React.Fragment>
			);
		}
	}
}
