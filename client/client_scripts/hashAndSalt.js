hashAndSalt = function(password){
    var passwordPart1 = password.substr(0, password.length / 2);
    var passwordPart2 = password.substr(password.length / 2, password.length);

    var salt = "cof_fee";

    return md5(passwordPart1 + salt + passwordPart2);
};