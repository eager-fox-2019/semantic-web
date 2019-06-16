// var ref = firebase.database().ref();
// var obj = {}
// var listDiv = document.getElementById('leaderboard-list')
// var ol = document.createElement('ol')
// ref.on("value", function(snapshot) {
//     console.log(snapshot.val());
//     var keys = Object.keys(snapshot.val())
//     keys.sort()
//     var length = 0
//     if(keys.length < 10){
//         length = keys.length
//     }
//     else{
//         length = 10
//     }
//     for(var x=0; x<length; x++){
//         console.log(keys[x] + snapshot.val()[keys[x]])
//         var li = document.createElement('li')
//         li.innerHTML = keys[x] + ' - ' + snapshot.val()[keys[x]]
//         ol.appendChild(li)
//     }
// }, 
// function (error) {
//     console.log("Error: " + error.code);
// });
// console.log(Object.keys(obj))