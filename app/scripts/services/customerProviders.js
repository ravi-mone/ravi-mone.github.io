/**
 * Created by Ravi on 3/26/14.
 */

angAuth.factory('customerProviders', function () {

    return{
        setUser: function (userName, userEmail, userPassword) {
            localStorage.setItem("userName", userName);
            localStorage.setItem("userEmail", userEmail);
            localStorage.setItem("userPassword", userPassword);
        },
        retriveUser: function () {
            return{
                userName: localStorage.getItem("userName"),
                userEmail: localStorage.getItem("userEmail"),
                userPassword: localStorage.getItem("userPassword")
            }
        }
    }
});