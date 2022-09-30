let Validator = require('validatorjs');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../../models/User');

exports.registerUser = async (req,res) => {
    let request_data = req.body;
    let rules = {
        first_name: 'required',
        last_name: 'required',
        email: 'required|email',
        phone: 'required',
        password: 'required'
      };
    let validation = new Validator(request_data, rules);
    if(validation.fails()){
        return res.json({'message': "Validation fails",'data': validation.errors});
    }

    let user_already_exists = await User.findOne({email: request_data.email});
    console.log(user_already_exists)
    if(user_already_exists){
        return res.json({'message': "User already exists with this email.",'data': {}});

    }
    let user = new User();
    user.first_name = request_data.first_name;
    user.last_name = request_data.last_name;
    user.email = request_data.email;
    user.role_id = 2; //2=User
    user.status = 'active';
    user.phone = request_data.phone;
    user.password = await bcrypt.hashSync(request_data.password, saltRounds);
    user.save();

    return res.json({'message': "User registered successfuly",'data': {}});
}


exports.loginUser = async (req,res) => {
    let request_data = req.body;
    let rules = {
        phone: 'required',
        password: 'required',
        role_id: 'required' //user=2,merchant=3, courier=4
    };
    let validation = new Validator(request_data, rules);

    if(validation.fails()){
        return res.json({'status': 0,'message': "Validation fails",'data': validation.errors});
    }

    try{
        let user = await User.findOne({phone: request_data.phone, role_id: request_data.role_id});
        if(!user){
            return res.json({'status': 0,'message': "User does not exists",'data': {}});
        }

        let passwordIsValid  = await bcrypt.compare(request_data.password, user.password);
        if(!passwordIsValid ){
            return res.json({'status': 0,'message': "User password is not valid",'data': {}});
        }
        var token = await jwt.sign(user.toJSON(), 'secret');
        user.password = null;

        return res.json({'status': 1,'message': "User loggedin successfuly",'data': { 'user': user,'access_token':token}});
    }catch(error){
        return res.json({'status': 0,'message': error.message,'data': { }});
    }
}