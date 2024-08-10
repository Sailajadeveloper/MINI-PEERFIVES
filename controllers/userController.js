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
            result: responseObj(true, 201, successMsg.userCreated, user),
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
        let user = await Users.findByPk(req.params.id);
        if (user) {
            user.user_name = user_name;
            user = user.toJSON();
            await Users.update(user,{
                where:{
                    id:req.params.id
                },
                returning: true,
                plain: true
            });
            return res.json({
                result: responseObj(true, 205, successMsg.Updated, user),
            });        
        } else {
            return res.json({
                result: responseObj(false, 404, errorMsg.notFound, user),
            });
        }
    } catch (err) {
        console.log(err, "====err");
        return res.json({
            result: responseObj(false, 500, messages.SomethingWentWrong, err),
        });
    }
}

