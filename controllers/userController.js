const { responseObj, successMsg, messages, errorMsg } = require('../constants');
const {Users,RewardHistory} = require('../models');
exports.getUsers = async(req,res)=>{
    try {
        console.log(req,"====req")
        let userData;
        if(req.query.id){
            const {id} = req.query
            userData = await Users.findByPk(id)
        }else{
            userData = await Users.findAll();
        }
        console.log(userData,"========== get users data==========")
        return res.json({
            result: responseObj(true, 200, successMsg.userFound, userData),
        });
    } catch (err) {
        console.log(err, "====err");
        return res.json({
            result: responseObj(false, 500, messages.SomethingWentWrong, err),
        });
    }
}
exports.createUser = async(req,res)=>{
    try {
        let reqData = req.body;
        reqData["p5_balance"] = 100;
        reqData["reward_balance"] = 0;
        console.log(reqData,"====reqData")
        const user = await Users.create(reqData);
        console.log(user,"===========create new user========")
        return res.json({
            result: responseObj(false, 201, successMsg.userCreated, user),
        });
    } catch (err) {
        console.log(err, "====err");
        return res.json({
            result: responseObj(false, 500, messages.SomethingWentWrong, err),
        });    
    }
}

exports.editUser = async(req,res) => {
    try {
        const { user_name } = req.body;
        const user = await Users.findByPk(req.params.id);
        if (user) {
            user.user_name = user_name;
            await user.save();
            return res.json({
                result: responseObj(true, 205, successMsg.Updated, user),
            });        
        } else {
            return res.json({
                result: responseObj(true, 404, errorMsg.notFound, user),
            });
        }
    } catch (err) {
        console.log(err, "====err");
        return res.json({
            result: responseObj(false, 500, messages.SomethingWentWrong, err),
        });
    }
}

exports.p5Transaction = async(req,res) => {
    const { points, recipient_id } = req.body;
    const sender = await Users.findByPk(req.params.id);
    const recipient = await Users.findByPk(recipient_id);
  
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

    try{
        // Deducting P5 from sender and adding to recipient's reward
        sender.p5_balance -= points;
        recipient.reward_balance += points;
        await sender.save();
        await recipient.save();

        // Record the transaction
        await RewardHistory.create({ points, given_by: sender.id, given_to: recipient.id });

        return res.json({
            result: responseObj(false, 201, successMsg.p5Created, {sender,recipient}),
        });
    }catch(err){
        console.log(err, "====err");
        return res.json({
            result: responseObj(false, 500, messages.SomethingWentWrong, err),
        });
    }
}