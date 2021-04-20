import React from 'react'
import ProfitProgress from '../Layout/ProfitProgress';
import ExpenseProgress from '../Layout/ExpenseProgress';
import ExpenseTable from '../Layout/ExpenseTable';
import BankProgress from '../Layout/BankProgress';
import NavibarI from '../Layout/MyNavBarI';
import Button from 'react-bootstrap/Button';
import { API_PATH } from '../Config';

export default class SnapshotGroup extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			path: this.props.location.pathname.split('/')[this.props.location.pathname.split('/').length]
		};

		this.exportExpenseData = this.exportExpenseData.bind(this);
		this.exportTransactionData = this.exportTransactionData.bind(this);
		this.exportDepositData = this.exportDepositData.bind(this);
	}

	exportExpenseData(){
		fetch(API_PATH + '/export/expense?bid=' + this.state.path, {
			mode: 'cors',
			method: 'GET',
			credentials: 'same-origin',
			headers: {
				'Accept': 'text/csv',
				'Authorization': window.localStorage.getItem('jwt')
			}
		}).then(response => {
			console.log(response);
			return response.text();
		}).then(data => {
			//Create a CSV Download link
			var downloadLink = document.createElement("a");
			var blob = new Blob(["\ufeff", data]);
			var url = URL.createObjectURL(blob);
			downloadLink.href = url;
			downloadLink.download = "Bid_" + this.state.path + "_expenseData.csv";
			document.body.appendChild(downloadLink);
			downloadLink.click();
			document.body.removeChild(downloadLink);

			console.log('YUP:', data);
		}).catch((error) => {
			console.error('Error:', error);
		});
	}
	exportTransactionData(){
		fetch(API_PATH + '/export/transaction?bid=' + this.state.path, {
			mode: 'cors',
			method: 'GET',
			credentials: 'same-origin',
			headers: {
				'Accept': 'text/csv',
				'Authorization': window.localStorage.getItem('jwt')
			}
		}).then(response => {
			console.log(response);
			return response.text();
		}).then(data => {
			//Create a CSV Download link
			var downloadLink = document.createElement("a");
			var blob = new Blob(["\ufeff", data]);
			var url = URL.createObjectURL(blob);
			downloadLink.href = url;
			downloadLink.download = "Bid_" + this.state.path + "_transactionData.csv";
			document.body.appendChild(downloadLink);
			downloadLink.click();
			document.body.removeChild(downloadLink);

			console.log('YUP:', data);
		}).catch((error) => {
			console.error('Error:', error);
		});
	}
	exportDepositData(){
		fetch(API_PATH + '/export/deposit?bid=' + this.state.path, {
			mode: 'cors',
			method: 'GET',
			credentials: 'same-origin',
			headers: {
				'Accept': 'text/csv',
				'Authorization': window.localStorage.getItem('jwt')
			}
		}).then(response => {
			console.log(response);
			return response.text();
		}).then(data => {
			//Create a CSV Download link
			var downloadLink = document.createElement("a");
			var blob = new Blob(["\ufeff", data]);
			var url = URL.createObjectURL(blob);
			downloadLink.href = url;
			downloadLink.download = "Bid_" + this.state.path + "_depositData.csv";
			document.body.appendChild(downloadLink);
			downloadLink.click();
			document.body.removeChild(downloadLink);

			console.log('YUP:', data);
		}).catch((error) => {
			console.error('Error:', error);
		});
	}

	render () {
		return (
			<React.Fragment>
				<NavibarI/>
				<h1 style={{textAlign:'center'}}> Group Name </h1>
				<h2> Profit Goals</h2>
				<ProfitProgress dataFromParent = {this.state.path} />
				<h3 style={{padding: '20px 0px'}}>Expenses / Revenue</h3>
				<ExpenseProgress />
				<h3 style={{padding: '20px 0px'}}>Bank / Square Status</h3>
				<BankProgress/>
				<div style={{textAlign: 'left', margin: '20px 0px 5px 0px'}}>
					<Button style={{margin: '0px 5px'}} onClick={this.exportExpenseData}>Download Expense Data</Button>
					<Button style={{margin: '0px 5px'}} onClick={this.exportTransactionData}>Download Transaction Data</Button>
					<Button style={{margin: '0px 5px'}} onClick={this.exportDepositData}>Download Deposit Data</Button>
				</div>
				<ExpenseTable style = {{padding: '10px 20px'}} dataFromParent = {{bid: this.state.path}}/>
			</React.Fragment>
		)
	}

}
