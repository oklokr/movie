import {
  requestGetAvailableMovieList,
  requestGetPopularityMovieList,
  requestGetRandomMovieList,
} from "@/api/main";
import Banner from "./component/banner";
import SlideList from "./component/slideList";
import PopularityList from "./component/popularityList";
import RandomList from "./component/randomList";

export default async function MainPage() {
  let availableList = null;
  let popularityList = null;
  let randomList = null;
  let bannerList = null;
  try {
    availableList = await requestGetAvailableMovieList();
    console.log(availableList);
    popularityList = await requestGetPopularityMovieList();
    console.log(popularityList);
    randomList = await requestGetRandomMovieList();
    console.log(randomList);
    bannerList = randomList?.data?.slice(0, 5) || [];
    console.log(bannerList);
  } catch (err) {
    console.log(err);
  }

  return (
    <div className="main-wrap">
      <Banner list={bannerList} />
      <SlideList list={availableList?.data} />
      <PopularityList list={popularityList?.data} />
      <RandomList list={randomList?.data} />
    </div>
  );
}
