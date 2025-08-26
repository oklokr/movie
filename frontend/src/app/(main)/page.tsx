// import { requestLogin } from "@/api/common";

export default async function MainPage() {
  // let result = null;
  // try {
  //   result = await requestLogin({ id: "user", passwd: "1234" });
  //   console.log(result);
  // } catch (err) {
  //   console.log(err);
  // }

  return (
    <div className="main-wrap">
      <section>영역1</section>
      <div>배너</div>
      <section>영역2</section>
      <div>배너</div>
      <section>영역3</section>
      <section>영역4</section>
    </div>
  );
}
