/**
 * 데이터베이스 사용하기
 *
 * 몽고디비에 연결하고 클라이언트에서 로그인할 때 데이터베이스 연결하도록 만들기

 * 웹브라우저에서 아래 주소의 페이지를 열고 웹페이지에서 요청
 *    http://localhost:3000/public/login.html
 *
 * @date 2016-11-10
 * @author Mike
 */

// Express 기본 모듈 불러오기
var express = require('express')
	,http = require('http')
	,path = require('path');

// Express의 미들웨어 불러오기
var bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	static = require('serve-static'),
	errorHandler = require('errorhandler');

// 에러 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');

// Session 미들웨어 불러오기
var expressSession = require('express-session');

// 익스프레스 객체 생성
var app = express();
app.set('port', process.env.PORT || 3000);

// body-parser를 이용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false}));

// body-parser를 이용해 application/json 파싱
app.use(bodyParser.json());


// public 폴더를 static으로 오픈
app.use('/public', static(path.join(__dirname, 'public')));

// cookie-parser 설정
app.use(cookieParser());

// 세션 설정
app.use(expressSession({
	secret:'my key',
	resave:true,
	saveUninitialized:true
}));


// ============ 데이터베이스 연결 =========//

// 몽고디비 모듈 사용
var MongoClient = require('mongodb').MongoClient;

// 데이터베이스 객체를 위한 변수 선언
var database;

// 데이터베이스에 연결
function connectDB() {
	// 데이터베이스 연결 정보
	var databaseUrl = 'mongodb://localhost:27017/local';

	// 데이터베이스 연결
	MongoClient.connect(databaseUrl, function(err, db) {
		if (err) {
			throw err;
		}

		console.log('데이터베이스에 연결되었습니다. : ' + databaseUrl);

		// database 변수에 할당
		database = db;
	});
}


//=========== 라우팅 함수 등록 ==========//

// 라우터 객체 참조
var router = express.Router();

// 로그인 라우팅 함수 - 데이터베이스의 정보와 비교
router.route('/process/login').post(function(req, res) {
	console.log('/process/login 호출됨.');

	// 요청 파라미터 확인
	var paramId = req.body.id || req.query.id;
	var paramPassword = req.body.password || req.query.password;

	console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword);

	// 데이터베이스 객체가 초기화된 경우, authUser 함수 호출하여 사용자 인증
	if (database) {

	}

});


// 라우터 객체 등록
app.use('/', router);

// 사용자를 인증하는 함수
var authUser = function(db, id, password, callback) {
	console.log('authUser 호출됨 : ' + id + password);

	// users 컬렉션 참조
	var user = db.collection('users');

	// 아이디와 비밀번호를 이용해 검색
	user.find({"id":id, "password":password}).toArray(function(err, docs) {
		if (err) {
			callback(err, null);
			return;
		}

		if (docs.length > 0) {		// 조회한 레코드가 있는 경우 콜백 함수를 호출하면서 조회 결과를 전달
			console.log('아이디 [%s], 패스워드 [%s] 가 일치하는 사용자 찾음.', id, password);
			callback(null, docs);

		} else {
			// 조회한 레코드가 없는 경우 콜백 함수를 호출하면서 null, null 전달
			console.log("일치하는 사용자를 찾지 못함");
			callback(null, null);
		}
	});
}

// 404 에러 페이지 처리
var errorHandler = expressErrorHandler({
	static : {
		'404': './public/404.html'
	}
});


app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

// Express 서버 시작
http.createServer(app).listen(app.get('port'), function() {
	console.log('서버가 시작되었습니다. 포트 : ' + app.get('port'));

	// 데이터베이스 연결을 위한 함수 호출
	connectDB();
});



