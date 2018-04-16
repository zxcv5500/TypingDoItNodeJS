// 사용 패턴 : 함수를 실행하면 인스턴스 객체를 리턴함

// 생성자 함수

var User = require('./user15_1');

var createUser = function(location, id, name) {
	console.log('createUser() 호출됨 : ' + location);

	if (location == '서초동') {
		console.log('우리 동 주민이 맞습니다.');
	} else {
		throw new Error('Not proper location');
	}

	return new User(id, name);
}

module.exports = createUser;
