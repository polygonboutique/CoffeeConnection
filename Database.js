/**
* author: Sergej.
**/

/*Database = new function(){
    this.Users = new Meteor.Collection('users');
};*/

Benutzer = new Meteor.Collection('benutzer');

//Benutzer.remove({});


//Database_Users = new Meteor.Collection('users');

/**
 * Users
 * -----
 * id: ,
 * name: ,
 * email: ,
 * password: ,
 * gameobject: , <-- {}
 * **/

if(Meteor.isServer) {
    Benutzer.allow({
        'insert': function (userId, docs) {
            console.log(docs);
            console.log("in der insert function");

            return true;
        },
        'update' : function (userId, doc, fieldNames, modifier){
            return true;
        }
    });
}