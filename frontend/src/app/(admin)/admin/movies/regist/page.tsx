"use client";
import Button from "@/components/ui/button";
import style from "./style.module.scss";
import Input from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import RadioGroup from "@/components/ui/radio";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { codeOption } from "@/utils/codeOption";
import Select from "@/components/ui/select";
import {
  requestGetCreatorList,
  requestGetMovieInfo,
  requestInsertMovie,
  requestUpdateMovie,
} from "@/api/admin";
import { fn_alert } from "@/components/ui/modal/alert";
import Textarea from "@/components/ui/textarea";
import { FaRegTrashAlt } from "react-icons/fa";

interface Option {
  label: string;
  value: string;
}

interface CreatorOption {
  creatorCode: string;
  creatorName: string;
  gender: string;
}

const defaultPostForm = {
  movieCode: "",
  genreCodeA: "",
  genreCodeB: null,
  genreCodeC: null,
  ratingTpcd: "2",
  movieName: "",
  synopsis: "",
  directCodeA: "",
  directCodeB: null,
  actorCodeA: "",
  actorCodeB: null,
  actorCodeC: null,
  actorCodeD: null,
  actorCodeE: null,
  vodState: "N",
  sales: "",
  discountrate: "",
  reservationState: "N",
  runtime: "",
  poster: "",
  background: "",
};

function SelectTags({
  options,
  selected,
  onChange,
  placeholder,
  maxLength,
}: {
  options: Option[];
  selected: Option[];
  onChange: (selected: Option[]) => void;
  placeholder?: string;
  maxLength: number;
}) {
  const handleAdd = (val: string | number) => {
    if (selected.length >= maxLength)
      return fn_alert(`최대 ${maxLength}개 까지 추가 가능합니다`);
    const exists = selected.some((item) => item.value === val);
    if (exists) {
      onChange(selected.filter((item) => item.value !== val));
    } else {
      const option = options.find((option) => option.value === val);
      if (option) onChange([...selected, option]);
    }
  };

  const handelRemove = (val: string | number) =>
    onChange(selected.filter((item) => item.value !== val));

  return options ? (
    <>
      <Select
        width={374}
        orientation="col"
        placeholder={placeholder}
        options={options}
        onChange={handleAdd}
        searchable
      />
      {selected.length > 0 && (
        <ul className={style["tag-wrap"]}>
          {selected.map((item) => (
            <li key={item.value}>
              <p>
                <span>{item.label}</span>
                <button type="button" onClick={() => handelRemove(item.value)}>
                  <FaRegTrashAlt color="#222" />
                </button>
              </p>
            </li>
          ))}
        </ul>
      )}
    </>
  ) : (
    <></>
  );
}

export default function Regist() {
  const code = useSelector((state: RootState) => state.common.code);

  const genreTypes = useMemo(() => codeOption(code.GENRE_TPCD), [code]);
  const ratingTypes = useMemo(() => codeOption(code.RATING_TPCD), [code]);
  const [creatorList, setCreatorList] = useState([]);

  const searchParams = useSearchParams();
  const movieCode = searchParams.get("movieId");
  const isEdit = movieCode;

  const [genres, setGenres] = useState<Option[]>([]);
  const [directs, setDirects] = useState<Option[]>([]);
  const [actors, setActors] = useState<Option[]>([]);

  const [postForm, setPostForm] = useState(defaultPostForm);

  const router = useRouter();

  const fetchCreatorList = () => {
    requestGetCreatorList().then((res) => {
      const { code, data, msg } = res;
      if (code !== 200) return fn_alert(msg);
      setCreatorList(
        data.map((item: CreatorOption) => ({
          label: item.creatorName,
          value: item.creatorCode,
        }))
      );
    });
  };

  const handleSave = () => {
    if (genres.length <= 0)
      return fn_alert("장르는 최소 1개 이상 선택해주세요.");
    if (postForm.movieName === "") return fn_alert("영화 제목을 입력해주세요.");
    if (postForm.runtime === "") return fn_alert("상영시간을 입력해주세요.");
    if (directs.length <= 0)
      return fn_alert("감독은 최소 1명 이상 선택해주세요.");
    if (actors.length <= 0)
      return fn_alert("출연진은 최소 1명 이상 선택해주세요.");

    const inputForm = {
      ...postForm,
      sales: Number(postForm.sales),
      discountrate: Number(postForm.discountrate),
      runtime: Number(postForm.runtime),
      genreCodeA: genres[0]?.value ?? "",
      genreCodeB: genres[1]?.value ?? null,
      genreCodeC: genres[2]?.value ?? null,
      directCodeA: directs[0]?.value ?? "",
      directCodeB: directs[1]?.value ?? null,
      actorCodeA: actors[0]?.value ?? "",
      actorCodeB: actors[1]?.value ?? null,
      actorCodeC: actors[2]?.value ?? null,
      actorCodeD: actors[3]?.value ?? null,
      actorCodeE: actors[4]?.value ?? null,
    };

    if (movieCode) {
      inputForm.movieCode = movieCode;
      requestUpdateMovie(inputForm).then((res) => {
        const { code, msg } = res;
        if (code !== 200) return fn_alert(msg);
        fn_alert(msg);
        router.back();
      });
      return;
    }

    requestInsertMovie(inputForm).then((res) => {
      const { code, msg } = res;
      if (code !== 200) return fn_alert(msg);
      fn_alert(msg);
      router.back();
    });
  };

  const setCodesToOptions = (
    codes: (string | null | undefined)[],
    options: Option[]
  ) => {
    if (!options) return [];
    return codes
      .map((code) => options.find((option) => option.value === code))
      .filter(Boolean) as Option[];
  };

  useEffect(() => fetchCreatorList(), []);
  useEffect(() => {
    if (!movieCode) return;
    requestGetMovieInfo({
      movieId: String(movieCode),
    }).then((res) => {
      const { code, data, msg } = res;
      if (code !== 200) return fn_alert(msg);

      const {
        genreCodeA,
        genreCodeB,
        genreCodeC,
        directCodeA,
        directCodeB,
        actorCodeA,
        actorCodeB,
        actorCodeC,
        actorCodeD,
        actorCodeE,
      } = data;

      const genreCodes = [genreCodeA, genreCodeB, genreCodeC];
      const directCodes = [directCodeA, directCodeB];
      const actorCodes = [
        actorCodeA,
        actorCodeB,
        actorCodeC,
        actorCodeD,
        actorCodeE,
      ];

      setGenres(setCodesToOptions(genreCodes, genreTypes));
      setDirects(setCodesToOptions(directCodes, creatorList));
      setActors(setCodesToOptions(actorCodes, creatorList));

      setPostForm((prev) => ({
        ...prev,
        movieName: data.movieName,
        runtime: data.runtime,
        synopsis: data.synopsis,
        ratingTpcd: data.ratingTpcd,
        poster: data.poster,
        background: data.background,
        sales: data.sales,
        discountrate: data.discountrate,
        vodState: data.vodState,
        reservationState: data.reservationState,
      }));
    });
  }, [movieCode, creatorList, genreTypes]);

  return (
    <div className={style["regist-wrap"]}>
      <h2>영화 {isEdit ? "수정" : "등록"}</h2>

      <ul className={style["form-wrap"]}>
        <li className={style.row}>
          <span className={style.label}>장르</span>
          <div className={style.content}>
            <SelectTags
              options={genreTypes}
              selected={genres}
              onChange={setGenres}
              placeholder="장르를 선택해주세요."
              maxLength={3}
            />
          </div>
        </li>
        <li className={style.row}>
          <span className={style.label}>관람등급</span>
          <div className={`${style.content} ${style["radio-form"]}`}>
            <RadioGroup
              options={ratingTypes}
              value={postForm.ratingTpcd}
              onChange={(val) =>
                setPostForm((prev) => ({ ...prev, ratingTpcd: val }))
              }
            />
          </div>
        </li>

        <li className={style.row}>
          <span className={style.label}>제목</span>
          <div className={style.content}>
            <Input
              placeholder="제목을 입력해주세요."
              value={postForm.movieName}
              onChange={(e) =>
                setPostForm((prev) => ({ ...prev, movieName: e.target.value }))
              }
            />
          </div>
        </li>
        <li className={style.row}>
          <span className={style.label}>상영시간</span>
          <div className={style.content}>
            <Input
              placeholder="상영시간을 입력해주세요."
              value={postForm.runtime}
              onChange={(e) =>
                setPostForm((prev) => ({ ...prev, runtime: e.target.value }))
              }
              type="number"
            >
              <span style={{ alignSelf: "center" }}>분</span>
            </Input>
          </div>
        </li>

        <li>
          <span className={style.label}>설명</span>
          <div className={style.content}>
            <Textarea
              placeholder="영화 설명을 입력해주세요."
              value={postForm.synopsis}
              onChange={(e) =>
                setPostForm((prev) => ({ ...prev, synopsis: e.target.value }))
              }
            />
          </div>
        </li>

        <li>
          <span className={style.label}>감독</span>
          <div className={style.content}>
            <SelectTags
              options={creatorList}
              selected={directs}
              onChange={setDirects}
              placeholder="감독을 선택해주세요."
              maxLength={2}
            />
          </div>
        </li>

        <li>
          <span className={style.label}>출연진</span>
          <div className={style.content}>
            <SelectTags
              options={creatorList}
              selected={actors}
              onChange={setActors}
              placeholder="출연진을 선택해주세요."
              maxLength={5}
            />
          </div>
        </li>

        <li className={style.row}>
          <span className={style.label}>DVD 서비스</span>
          <div className={style.content}>
            <RadioGroup
              label={"사용여부"}
              options={[
                { label: "Y", value: "Y" },
                { label: "N", value: "N" },
              ]}
              value={postForm.vodState}
              onChange={(val) =>
                setPostForm((prev) => ({ ...prev, vodState: val }))
              }
              orientation="col"
              labelWidth={"60px"}
              labelAlign="left"
            />
            <Input
              label="판매금액"
              placeholder="금액을 입력해주세요."
              value={postForm.sales}
              onChange={(e) =>
                setPostForm((prev) => ({
                  ...prev,
                  sales: e.target.value,
                }))
              }
              orientation="col"
              labelWidth={"60px"}
              labelAlign="left"
              min={0}
              type="number"
            >
              <span style={{ alignSelf: "center" }}>원</span>
            </Input>
            <Input
              label="할인율"
              placeholder="할인율을 입력해주세요."
              value={postForm.discountrate}
              onChange={(e) => {
                let val = Number(e.target.value);
                if (val > 100) val = 100;
                setPostForm((prev) => ({
                  ...prev,
                  discountrate: String(val),
                }));
              }}
              labelWidth={"60px"}
              labelAlign="left"
              orientation="col"
              min={0}
              max={100}
              type="number"
            >
              <span style={{ alignSelf: "center" }}>%</span>
            </Input>
          </div>
        </li>

        <li className={style.row}>
          <span className={style.label}>예매 서비스</span>
          <div className={style.content}>
            <RadioGroup
              label={"사용여부"}
              options={[
                { label: "Y", value: "Y" },
                { label: "N", value: "N" },
              ]}
              value={postForm.reservationState}
              onChange={(val) =>
                setPostForm((prev) => ({ ...prev, reservationState: val }))
              }
              orientation="col"
              labelWidth={"60px"}
              labelAlign="left"
            />
          </div>
        </li>

        <li className={style.row}>
          <span className={style.label}>포스터 이미지</span>
          <div className={style.content}>
            <Input
              placeholder="포스터url를 입력해주세요."
              value={postForm.poster}
              onChange={(e) =>
                setPostForm((prev) => ({ ...prev, poster: e.target.value }))
              }
            />
          </div>
        </li>
        <li className={style.row}>
          <span className={style.label}>배경 이미지</span>
          <div className={style.content}>
            <Input
              placeholder="배경 이미지url를 입력해주세요."
              value={postForm.background}
              onChange={(e) =>
                setPostForm((prev) => ({ ...prev, background: e.target.value }))
              }
            />
          </div>
        </li>
      </ul>

      <div className={style["btn-wrap"]}>
        <Button variant="yellow" onClick={router.back}>
          목록
        </Button>
        <Button variant="yellow" onClick={handleSave}>
          저장
        </Button>
      </div>
    </div>
  );
}
