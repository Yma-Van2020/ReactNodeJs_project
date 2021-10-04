
var request = require('request'); //an npm module that simplifies HTTP request in the node.

const readline = require('readline').createInterface({ //readline module provides a way of reading a datastream, one line at a time
    //then creates an interface object
    input: process.stdin,  //listens for the user input 
    output: process.stdout  //used to send data out of the program
  });
   
 
  readline.question('What are you looking for?', name => {
    name.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""); //using regex to handle special characters
    var url = `https://en.wikipedia.org/w/api.php?action=opensearch&search="+ ${name} +"&format=json` //open search action
    request(url, function(err, res, body) { //pass in the target URL, and request returns a callback function.
        if (err) {
            var error = "cannot connect to the server";
            console.log(error); // then check for an error in our request. If there is one, we log the error to the console.
        } else {
            var wiki = JSON.parse(body); //converts the res that's been sent back into a javascript object
            //JSON is a way to store information in an organized way, that helps to access data easily and it looks like JavaScript Object.
            for (let i = 0; i < 3; i++) {
                if(i === 0){
                    console.log(`The title you searched for is : ${wiki[1][0]}\n This is the link to the relevent article - ${wiki[3][0]}` + "\n");
                } else {
                    console.log(` This is the link to the relevent article - ${wiki[3][i]}` + "\n");
               
                }
            }
    
        }
    
    });
    readline.close();// closes the readline.Interface instance and relinquishes control over the input and output streams. 
  });
  


