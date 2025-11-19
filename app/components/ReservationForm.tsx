"use client";

import { useForm, Controller } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Button from "./Button";
import { useEffect, useState } from "react";
import { Country } from "../api/countries/route";

type FormData = {
  name: string;
  email: string;
  phone: string;
  destination: string;
  date: string;
  message?: string;
};

const ReservationForm = () => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/countries");
        const data: Country[] = await res.json();
        setCountries(data);
      } catch (error) {
        console.error("Fetch countries error:", error);
      }
    };

    fetchData();
  }, []);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result);
      if (result.success) console.log("Reservation checked!");
      else console.log("Reservation aborted!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-between w-full max-w-2xl"
    >
      <div className="flex flex-col gap-4">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField label="Imię i nazwisko" {...field} />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => <TextField label="Nazwisko" {...field} />}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => <TextField label="E-mail" {...field} />}
        />
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <TextField label="Telefon komórkowy" {...field} />
          )}
        />
        <FormControl>
          <InputLabel>Wybierz kraj</InputLabel>
          <Controller
            name="destination"
            control={control}
            render={({ field }) => (
              <Select label="Wybierz kraj" {...field}>
                {countries.map(({ name, flag }) => (
                  <MenuItem className="flex gap-3" key={name}>
                    <img width={25} src={flag} alt={name} />
                    <p className="text-m">{name}</p>
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>

        <Controller
          name="date"
          control={control}
          render={({ field }) => <TextField label="Wybierz datę" {...field} />}
        />
        <Controller
          name="message"
          control={control}
          render={({ field }) => (
            <TextField label="Opisz krótko wymagania wycieczki" {...field} />
          )}
        />
      </div>
      <Button type="submit">Wyślij</Button>
    </form>
  );
};

export default ReservationForm;
