const { responseObj, successMsg, messages, errorMsg } = require('../constants');
const {Users,RewardHistory} = require('../models');
const moment = require('moment')


exports.createP5Transaction = async (req, res) => {
    const { points, recipient_id, given_by_name, given_to_name } = req.body;
    let sender = await Users.findByPk(req.params.id);
    let recipient = await Users.findByPk(recipient_id);
  
    if (!sender || !recipient) {
        return res.json({
            result: responseObj(false, 400, errorMsg.userNFound),
        });
    }
  
    if (points > sender.p5_balance) {
        return res.json({
            result: responseObj(false, 400, errorMsg.insuffecientP5Bln),
        });
    }

    try {
        // Deducting P5 from sender and adding to recipient's reward
        sender.p5_balance -= points;
        recipient.reward_balance += points;
        sender = sender.toJSON();
        recipient = recipient.toJSON();
        await Users.update(
            sender,
            {
                where:{id: req.params.id},
                returning: true,
                plain: true
            }
        );
        await Users.update(
            recipient,
            {
                where: {id: recipient_id},
                returning: true,
                plain: true
            }
        );
        const datentime =  moment(new Date()).format('YYYY-MM-DD')
        console.log(datentime,"===============current date")
        // Record the transaction, including names
        await RewardHistory.create({ 
            points, 
            given_by: sender.id, 
            given_by_name, // Store the name of the sender
            given_to: recipient.id, 
            given_to_name, // Store the name of the recipient
            timestamp: datentime 
        });

        return res.json({
            result: responseObj(true, 201, successMsg.p5Created, {sender, recipient}),
        });
    } catch(err) {
        console.log(err, "====err");
        return res.json({
            result: responseObj(false, 500, messages.SomethingWentWrong, err),
        });
    }
}


exports.deleteP5Transaction = async(req,res) => {
    const transaction = await RewardHistory.findByPk(req.params.transaction_id);
    if (!transaction) {
        return res.json({
            result: responseObj(false, 404, errorMsg.trnsUser),
        });
    }
    let sender = await Users.findByPk(transaction.given_by);
    let recipient = await Users.findByPk(transaction.given_to);

    if (!transaction || !sender || !recipient) {
        return res.json({
            result: responseObj(false, 404, errorMsg.trnsUser),
        });
    }

    try{
        sender.p5_balance += transaction.points;
        recipient.reward_balance -= transaction.points;
        sender = sender.toJSON()
        recipient = recipient.toJSON()
        await Users.update(sender,{
            where: {id: transaction.given_by},
            returning: true,
            plain: true
        });
        await Users.update(recipient,{
            where: {id: transaction.given_to},
            returning: true,
            plain: true
        });

        await transaction.destroy();
        return res.json({
            result: responseObj(true, 200, successMsg.p5Deleted, {sender,recipient}),
        });
    }catch(err){
        console.log(err, "====err");
        return res.json({
            result: responseObj(false, 500, messages.SomethingWentWrong, err),
        });
    }
}

exports.rewardsHistory = async(req,res) =>{
    try{
        // const history = await RewardHistory.findAll({ where: { given_to: parseInt(req.params.id) } });
        const history = await RewardHistory.findAll({ where: { given_to: parseInt(req.params.id) } });
        console.log(history,"================history")
        return res.json({
            result: responseObj(true, 200, successMsg.historyFound, history),
        });
    }catch(err){
        console.log(err, "====err");
        return res.json({
            result: responseObj(false, 500, messages.SomethingWentWrong, err),
        });
    }
}
exports.pointsHistory = async(req,res) =>{
    try{
        // const history = await RewardHistory.findAll({ where: { given_to: parseInt(req.params.id) } });
        const history = await RewardHistory.findAll({ where: { given_by: parseInt(req.params.id) } });
        console.log(history,"================history")
        return res.json({
            result: responseObj(true, 200, successMsg.historyFound, history),
        });
    }catch(err){
        console.log(err, "====err");
        return res.json({
            result: responseObj(false, 500, messages.SomethingWentWrong, err),
        });
    }
}