const getQs =(req,res)=>{
    res.status(200).json({
        msg1:'Server is fetching the qs',
        msg2:"Here are ur qs"
    })
}
const  postQs=(req,res)=>{
    res.status(200).json({
        msg_p1 : "Uploading the qs",
        msg_p2 : "Up[loaded the qs"
    })
}

module.exports = { getQs,postQs}