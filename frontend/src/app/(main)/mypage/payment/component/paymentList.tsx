"use client";

import { requestgetOrderHistory } from "@/api/user";
import { fn_alert } from "@/components/ui/modal/alert";
import Pagination from "@/components/ui/pagination";
import Table from "@/components/ui/table";
import { RootState } from "@/redux/store";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function PaymentList() {
  const userInfo = useSelector((state: RootState) => state.user.info);
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const [total, setTotal] = useState(0);
  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistoryList = (pageNum: number, userId: string) => {
    requestgetOrderHistory({
      userId: userId,
      page: pageNum,
    }).then((res) => {
      const { code, data, msg } = res;
      if (code !== 200) return fn_alert(msg);
      setTotal(data.total);
      setHistoryList(data.list);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchHistoryList(page, userInfo?.userId);
  }, [page, userInfo?.userId]);

  const columns = [
    { label: "주문번호", key: "orderCode", width: "120px" },
    { label: "영화명", key: "movieName", width: "120px" },
    {
      label: "금액",
      key: "price",
      width: "120px",
      render: (item) => `${item.price.toLocaleString()}원`,
    },
    { label: "구매일", key: "orderDate", width: "120px" },
    {
      label: "구분",
      key: "orderType",
      width: "120px",
      render: (item) => (item.orderType === "VOD" ? "VOD구매" : "예매"),
    },
  ];

  return (
    <>
      <div className="table-wrap">
        <div className="total-wrap">
          <span>총 {total?.toLocaleString()}건</span>
        </div>
        <Table
          columns={columns}
          data={historyList}
          loading={loading}
          rowKey="userId"
        />
      </div>
      <Pagination total={total} size={8} />
    </>
  );
}
