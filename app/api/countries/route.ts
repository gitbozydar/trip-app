import { NextResponse } from "next/server";

export interface Country {
  name: string;
  latlng: [number, number];
  flag: string;
}

export async function GET() {
  const res = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,latlng,flags"
  );
  const data = await res.json();

  const countries: Country[] = data
    .map((country: any) => ({
      name: country.name.common,
      latlng: country.latlng,
      flag: country.flags.png,
    }))
    .sort((a: any, b: any) => a.name.localeCompare(b.name));

  return NextResponse.json(countries);
}
