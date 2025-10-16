// app/api/portone/getVerification/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { getId } = body as { getId?: string };

    if (!getId) {
      return NextResponse.json({ error: "getId required" }, { status: 400 });
    }

    // PortOne 요청 URL
    const url = `https://api.portone.io/identity-verifications/${encodeURIComponent(
      getId
    )}`;

    // 직접 키 삽입 (주의: 실제 서비스 시에는 환경변수로 빼는 게 안전)
    const resp = await fetch(url, {
      method: "GET",
      headers: {
        Authorization:
          "PortOne w6LyhMckJqzDQrMvmDeRqWCXkJtvZWWRDPnm8HEOxCTNUTAbfOGuPOI7jSf3N2lsL1R16wVGEAft3kGA",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const data = await resp.json();
    return NextResponse.json(data, { status: resp.status });
  } catch (err: any) {
    console.error("❌ PortOne API 호출 실패:", err);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
