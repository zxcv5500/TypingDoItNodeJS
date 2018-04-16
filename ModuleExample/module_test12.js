// 모듈을 사용하지 않는 경우 : 인스턴스 객체를 함수의 파라미터로 전달하는 일반적인 경우

function print(parent, user) {
	console.log('print() 호출됨 : %s, %s, %s', parent, user.id, user.name);
}

var parent = '소녀시대의 엄마';

function User(id, name) {
	this.id = id;
	this.name = name;
}

// 두번째 파라미터가 new 연산자를 이용해 만든 인스턴스 객체인 경우
print(parent, new User('user1', '소녀시대'));
