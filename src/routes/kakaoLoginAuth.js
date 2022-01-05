const uri = window.location.href;
const arr = uri.split("=");

const Test = () => {
  return (
    <div>
      <h1>카카오 로그인 테스트 화면입니다.</h1>
      <h3>{uri}</h3>
      <h3>{arr[1]}</h3>
    </div>
  );
};

export default Test;
