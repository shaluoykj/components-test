function goto(state) {
  this.$router.push(state)
}

function goback() {
  this.$router.go(-1)
}

export default {
  goto: goto,
  goback: goback
}
