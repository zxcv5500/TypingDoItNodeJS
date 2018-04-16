// 사용 패턴 : 외부 모듈을 불러와 new 연산자로 인스턴스 객체를 만들어 리턴하는 함수를 정의함

var User = require('./user14_1');

var createUser = function(id, name) {
	return new User(id, name);
}

module.exports = createUser;
