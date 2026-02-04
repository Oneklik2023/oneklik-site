// app/api/wp-logos/route.ts
import { GET as handler } from "../img/wp-logos/route";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const GET = handler;
