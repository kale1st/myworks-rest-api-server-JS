import axios from "axios";
import { Request, Response } from "express";

export const lugat = async (req: Request, res: Response) => {
  const word = req.body.word;

  axios
    .get(
      "https://lugat.osmanlica.online/?kelime=" +
        word +
        "&kaynak=browser&sadecehattikuran=false&filitre=Luggat,arap%C3%A7a%20kelimeler&manadaara=false&json=True"
    )
    .then((response: any) => {
      if (response.data ?? false) {
        res.send(response.data);
      } else {
        console.log(word + " kelimesinin anlamı bulunamadı");
      }
    })
    .catch((error: any) => {
      console.error(`Error: ${error.message}`);
    });
};
