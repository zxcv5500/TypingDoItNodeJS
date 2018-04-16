// 사용 패턴 : exports의 속성 이름을 주면서 추가하되 프로토타입 객체를 정의한 후 할당함

// 생성자 함수
function User(id, name) {
	this.id = id;
	this.name = name;
}

User.prototype.getUser = function() {
	return {id:this.id, name:this.name};
}

User.prototype.group = {id:'group', name:'친구'};

User.prototype.printUser = function() {
	console.log('user 이름 : %s, group 이름 : %s', this.name, this.group.name);
}

exports.User = User;
