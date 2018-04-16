/*
 * 사용자 정보 처리 모듈
 * 데이터베이스 관련 객체들을 init() 메소드로 설정
 *
 * @date 2016-11-10
 * @author Mike
 */

var database;
var UserSchema;
var UserModel;

// 데이터베이스 객체, 스키마 객체, 모델 객체를 이 모듈에서 사용할 수 있도록 전달함
var init = function(db, schema, model) {
	console.log('init 호출됨.');

	database = db;
	UserSchema = schema;
	UserModel = model;
}

var login = function(req, res) {
	console.log('user 모듈 안에 있는 login 호출됨.');

	// 데이터베이스 객체가 필요한 경우 req.app.get('database')로도 참조 가능

	// 요청 파라미터 확인
	var paramId = req.body.id || req.query.id;
	var paramPassword = req.body.password || req.query.password;

	console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword);

	// 데이터베이스 객체가 초기화 된 경우, authUser 함수 호출하여 사용자 인증
	if (database) {
		authUser(database, paramId, paramPassword, function(err, docs) {
			//에러 발생시, 클라이언트로 에러 전송

			if (err) {
				console.error('로그인 중 에러 발생 : ' + err.stack);

				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>로그인 중 에러 발생</h2>');
				res.write('<p>' + err.stack + '</p>');
				res.end();

				return;
			}

			// 조회된 레코드가 있으면 성공 응답 전송
			if (docs) {
				console.dir(docs);

				// 조회된 결과에서 사용자 이름 확인
				var username = docs[0].name;

				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<div><p>사용자 아이디 : ' + paramId + '</p></div>');
				res.write('<div><p>사용자 이름 : ' + username + '</p></div>');
				res.write("<br><br><a href='/public/login.html'>다시 로그인하기</a>");
				res.end();

			} else {  // 조회된 레코드가 없는 경우 실패 응답 전송
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h1>로그인  실패</h1>');
				res.write('<div><p>아이디와 패스워드를 다시 확인하십시오.</p></div>');
				res.write("<br><br><a href='/public/login.html'>다시 로그인하기</a>");
				res.end();
			}
		});
	} else {			// 데이터베이스 객체가 초기화되지 않은 경우 실패 응답전송
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.write('<div><p>데이터베이스에 연결하지 못했습니다.</p></div>');
		res.end();
	}

}

var adduser = function(req, res) {
	console.log('user 모듈 안에 있는 adduser 호출됨.');

	// 필요한 경우 req.app.get('database') 로도 참조 가능

	var paramId = req.body.id || req.query.id;
	var paramPassword = req.body.password || req.query.password;
	var paramName = req.body.name || req.query.name;

	console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword + ', ' + paramName);

	// 데이터베이스 객체가 초기화된 경우, addUser 함수 호출하여 사용자 추가
	if (database) {
		addUser(databse, paramId, paramPassword, paramName, function(req, addedUser) {
			// 동일한 id로 추가하려믄 경우 에러 발생 - 클라이언트로 에러 전송
			if (err) {
				console.error('사용자 추가 중 에러 발생 : ' + err.stack);

				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 추가 중 에러 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
				res.end();

                return;
			}

			// 결과 객체에 있으면 성공 응답 전송
			if (addedUser) {
				console.dir(addedUser);

				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 추가 성공</h2>');
				res.end();
			} else {				// 결과 객체가 없으면 실패 응답 전송
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 추가  실패</h2>');
				res.end();
			}
		});
	} else {  // 데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
}


//사용자를 추가하는 함수
var addUser = function(database, id, password, name, callback) {
	console.log('addUser 호출됨 : ' + id + ', ' + password + ', ' + name);

	// UserModel 인스턴스 생성
	var user = new UserModel({"id":id, "password":password, "name":name});

	// save()로 저장 : 저장 성공 시 addedUser 객체가 파라미터로 전달됨
	user.save(function(err, addedUser) {
		if (err) {
			callback(err, null);
			return;
		}

	    console.log("사용자 데이터 추가함.");
	    callback(null, addedUser);

	});
}


// module.exports 객체에 속성으로 추가

module.exports.init = init;
module.exports.login = login;
module.exports.adduser = adduser;
module.exports.listuser = listuser;
