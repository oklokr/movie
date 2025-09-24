"use client";
import Button from "@/components/ui/button";
import style from "./style.module.scss";
import Input from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import DatePickerField from "@/components/ui/datePicker";
import { useEffect, useMemo, useState } from "react";
import RadioGroup from "@/components/ui/radio";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { codeOption } from "@/utils/codeOption";
import Select from "@/components/ui/select";

interface Option {
  label: string;
  value: string | number;
}

const postForm = {
  genreCodea: "",
  genreCodeb: "",
  genreCodec: "",
  ratingTpcd: "",
  movieName: "",
  synopsis: "",
  directCodea: "",
  directCodeb: "",
  actorCodea: "",
  actorCodeb: "",
  actorCodec: "",
  actorCoded: "",
  actorCodee: "",
  vodState: "",
  sales: "",
  discountrate: "",
  reservationState: "",
  poster: "",
};

function SelectTags({
  options,
  selected,
  onChange,
  placeholder,
}: {
  options: Option[];
  selected: Option[];
  onChange: (selected: Option[]) => void;
  placeholder?: string;
}) {
  const handleAdd = (val: string | number) => {
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

  return (
    <>
      <Select
        width={374}
        orientation="col"
        placeholder={placeholder}
        options={options}
        onChange={handleAdd}
        searchable
      />
      <ul>
        {selected.map((item) => (
          <li key={item.value}>
            <span>{item.label}</span>
            <button type="button" onClick={() => handelRemove(item.value)}>
              삭제
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default function Regist() {
  const code = useSelector((state: RootState) => state.common.code);

  const genreTypes = useMemo(() => codeOption(code.GENRE_TPCD), [code]);
  const ratingTypes = useMemo(() => codeOption(code.RATING_TPCD), [code]);

  const searchParams = useSearchParams();
  const movieCode = searchParams.get("movieId");
  const isEdit = movieCode;

  const [rangeDates, setRangeDates] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [rating, setRating] = useState("all");
  const [genres, setGenres] = useState<Option[]>([]);
  const [directs, setDirects] = useState<Option[]>([]);
  const [actors, setActors] = useState<Option[]>([]);

  const handleRangeChange = (
    dates: Date | [Date | null, Date | null] | null
  ) => {
    if (!Array.isArray(dates)) return;
    setRangeDates(dates);
  };

  useEffect(() => {
    console.log(genres);
  }, [genres]);

  return (
    <div>
      <h2>영화 {isEdit ? "수정" : "등록"}</h2>

      <dl>
        <dt>장르</dt>
        <dd>
          <SelectTags
            options={genreTypes}
            selected={genres}
            onChange={setGenres}
            placeholder="장르를 선택해주세요."
          />
        </dd>

        <dt>관람등급</dt>
        <dd>
          <RadioGroup
            options={ratingTypes}
            value={rating}
            onChange={setRating}
          ></RadioGroup>
        </dd>

        <dt>제목</dt>
        <dd>
          <Input placeholder="제목을 입력해주세요." />
        </dd>
        <dt>설명</dt>
        <dd>
          <textarea name="" id=""></textarea>
        </dd>
        <dt>감독</dt>
        <dd></dd>
        <dt>출연진</dt>
        <dd></dd>
        <dt>DVD 서비스</dt>
        <dd>
          <DatePickerField
            type="range"
            startDate={rangeDates[0]}
            endDate={rangeDates[1]}
            onChange={handleRangeChange}
            placeholder="날짜를 선택해주세요."
          />
        </dd>
        <dt>예매 서비스</dt>
        <dd></dd>
        <dt>포스터 이미지</dt>
        <dd></dd>
      </dl>

      <div className={style["btn-wrap"]}>
        <Button variant="yellow">목록</Button>
        <Button variant="yellow">저장</Button>
      </div>
    </div>
  );
}
