export default async function subscription(req,res){
    if(req.method === 'POST'){
        const email = req.body.email;
        const data = {
            members: [
                {
                    email_address: email,
                    status: 'subscribed'
                }
            ]
        }
        const postData = JSON.stringify(data)
        const options = {
            url: 'https://us20.api.mailchimp.com/3.0/lists/80fd31cb68',
            method : 'post',
            headers:{
                Authorization: 'auth c0444f0b081c6c637bed2beffd3b208a-us20'
            },
            body: postData
        }
        res.status(201).json({msg: "Subscribed!"});
        }
    
}    