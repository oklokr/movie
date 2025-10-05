"use client";

import DatePickerField from "@/components/ui/datePicker";
import style from "./style.module.scss";
import { useState } from "react";
import Button from "@/components/ui/button";

const times = [
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
  "24:00",
];

export default function ScheduleForm() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <div className={style["schedule-wrap"]}>
      <h2>상영관리</h2>

      <div>
        <div>
          <DatePickerField
            label="날짜 선택"
            orientation="col"
            value={date}
            onChange={(d) => setDate(d as Date | null)}
          />
          <div>
            <div>
              <p>
                <span>1관</span>
                <button>열기</button>
              </p>
              <ul>
                <li>
                  <input type="checkbox" name="time" value="09:00" />
                  <span>09:00</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="btn-wrap">
            <Button>추가하기</Button>
            <Button>삭제</Button>
          </div>
        </div>
        <div></div>
        <Button>다음</Button>
      </div>
    </div>
  );
}
