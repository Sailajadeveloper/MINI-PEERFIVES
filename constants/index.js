const responseObj = (status = false, statusCode = "500", message = messages.SomethingWentWrong, data = {}) => {
    return { status, statusCode, message, data }
}

const messages = {
    systemError : "System error. Please contact your administrator",
    SomethingWentWrong: "Something Went Wrong",
}

const successMsg = {
    userFound: "User Data Fetched Successfully!",
    Updated: "Data Updated Successfully!",
    userCreated: "New User Created Successfully!",
    p5Created: "p5 Transaction Created Successfully!"
};
const errorMsg = {
    notFound: "Data Not Found!",
    userIDNotFound: "Invalid User ID!",
    userNFound: "User Data Not Found!",
    rewardIDNotFound: "Invalid Reward History ID!",
    reqDataErr: "error with request data",
    insuffecientP5Bln: "Insufficient P5 balance"
};
module.exports = {
    messages, responseObj, successMsg, errorMsg,
}

