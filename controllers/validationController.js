const { messages, responseObj, errorMsg } = require("../constants");


exports.checkUser = (req,res,next)=>{
    try{
        const data = req.body;
        let error = false;
        if( data['user_name'] == undefined
            || data['user_name'].length === 0 
        ) {
          error = true
        }
        if(error) {
            return res.json({
                result: responseObj(false, 400, errorMsg.reqDataErr),
            });
        }else{
          next();
        }
    }catch(err){
        return res.json({
            result: responseObj(false, 500, messages.SomethingWentWrong, err),
        });
    }
}
