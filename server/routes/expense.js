const express = require('express');
const router = express.Router();
const authorizor = require('../authorizor');
const q = require('../queries');

router.get('/', authorizor.authToken, async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	let {code, data} = await q.getMultipleExpenses(req.body.asker, req.query.start, req.query.end, req.query.bid);
	res.statusCode = code;
	res.send(JSON.stringify(data));
});

router.post('/', authorizor.authToken, async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	let {code} = await q.addExpense(req.body.asker, req.body.expense);
	res.statusCode = code;
	res.end();
});

router.delete('/byeid', authorizor.authToken, async (req, res) => {
	let {code} = await q.deleteExpenseByEid(req.body.asker, req.query.eid);
	res.statusCode = code;
	res.end();
});

module.exports = router;
