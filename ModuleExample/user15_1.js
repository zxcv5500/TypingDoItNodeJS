// 사용 패턴 : 프로토타입을 할당. 생성자 함수를 실행하면 인스턴스 객체를 리턴함

// 생성자 함수
var User = function(id, name) {
	this.id = id;
	this.name = name;
}

module.exports = User;
