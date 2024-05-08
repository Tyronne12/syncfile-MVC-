
class Login_Val{

    validate_reg_data(req, res, next) {
        const { first_name, last_name, email, contact_number, password, confirm_password } = req.body;
        if (!first_name || !last_name || !email || !password || !contact_number || !confirm_password) {
            console.log('Input fields required');
            return res.redirect('http://localhost:8000/');
        }
        next();
    }

    validate_login_data(req, res, next){
        const {email, password} = req.body;
        if (!email || !password){
            console.log('Input fields required');
            return res.redirect('http://localhost:8000/');
        }
        next();
    }

}

module.exports = new Login_Val;