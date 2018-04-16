// user2는 {}로 리턴됨
// 오류 발생함
// Reason : user2.js 파일에서 exports에 객체를 할당하였으므로, exports 전역변수에는 아무것도 할당되지 않음
// 			require() 호출 시 자바스크립트에서 새로운 변수로 처리함
//			결국 아무 속성도 없는 {} 객체가 리턴됨

var user = require('./user2');

console.log('user 참조변수 값을 확인함.');
console.dir(user);
console.log('======= ============');
function showUser() {
	return user.getUser().name + ', ' + user.group.name;
}

console.log('사용자 정보 : %s ', showUser());
