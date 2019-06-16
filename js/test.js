function tes(){
    var firebaseRef = firebase.database().ref()
    firebaseRef.child('1234').set('dion')
}
function hide(){
    var text = document.getElementById("nameInput").value
    alert(text)

}