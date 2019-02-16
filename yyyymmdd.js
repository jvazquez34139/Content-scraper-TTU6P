//helper functions
const dateText = () => {
  let text = ""
  const dt = new Date();
  text += dt.getFullYear() + "-";
  text += zerofill(dt.getMonth() + 1) + "-";
  text += zerofill(dt.getDate());
  return text;
}
const zerofill = num => {
  if(num.toString().length == 1){
    return "0" + num;
  }else{
    return num;
  }
}

module.exports.date = dateText;
